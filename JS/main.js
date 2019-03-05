const numbers = document.querySelectorAll('.number');
const decimal = document.querySelector('.decimal');
const operators = document.querySelectorAll('.operator');
const expression = document.querySelector('.expression');
const result = document.querySelector('.result');
let tempNumber = '0';
let repeatClickOperator = false;
let expressions = [];

function strip(num, precision = 12) {
  return +parseFloat(num.toPrecision(precision));
}

function inputValue(e) {
  const value = e.target.innerHTML;

  tempNumber += value;

  if (tempNumber === '0') {
    result.innerHTML = '0';
  } else if (tempNumber[0] === '0' && tempNumber[1] !== '.' && tempNumber.length >= 1) {
    [tempNumber] = [tempNumber[1]];
    result.innerHTML = tempNumber;
  } else {
    result.innerHTML = tempNumber;
  }
}

function compute(fullExpression) {
  const computedResult = eval(fullExpression);
  result.innerHTML = strip(computedResult);
}

function inputOperator(e) {
  let operator = e.target.innerHTML;

  repeatClickOperator = false;

  if (operator === '÷') {
    operator = '/';
  } else if (operator === '×') {
    operator = '*';
  }

  if (repeatClickOperator === false) {
    if (operator !== '=') {
      expressions.push(tempNumber);
      expressions.push(operator);

      for (let i = 0; i < expressions.length; i++) {
        expression.innerHTML += `${expressions[i]}`;
      }
    } else {
      expressions.push(tempNumber);

      for (let i = 0; i < expressions.length; i++) {
        expression.innerHTML += `${expressions[i]}`;
      }

      const fullExpression = expression.innerHTML;

      compute(fullExpression);
    }
  }

  tempNumber = '0';
  expressions = [];

  repeatClickOperator = true;
}

for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener('click', inputValue, false);
}

decimal.addEventListener('click', inputValue, false);

for (let i = 0; i < operators.length; i++) {
  operators[i].addEventListener('click', inputOperator, false);
}
