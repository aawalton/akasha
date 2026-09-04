import { __TS__CountVarargs } from "./CountVarargs"

export function __TS__ArrayReduceRight<TElement>(
  this: TElement[],
  callbackFn: (
    accumulator: TElement,
    currentValue: TElement,
    index: number,
    array: TElement[]
  ) => TElement
): TElement
export function __TS__ArrayReduceRight<TElement, TAccumulator>(
  this: TElement[],
  callbackFn: (
    accumulator: TAccumulator,
    currentValue: TElement,
    index: number,
    array: TElement[]
  ) => TAccumulator,
  initial: TAccumulator
): TAccumulator
export function __TS__ArrayReduceRight<TAccumulator, TElement extends TAccumulator>(
  this: TElement[],
  callbackFn: (
    accumulator: TAccumulator,
    currentValue: TElement,
    index: number,
    array: TElement[]
  ) => TAccumulator,
  ...initial: TAccumulator[]
): TAccumulator {
  const len = this.length

  let k: number
  let accumulator: TAccumulator
  if (__TS__CountVarargs(...initial) !== 0) {
    ;[accumulator] = [...initial]
    k = len - 1
  } else if (len > 0) {
    accumulator = this[len - 1]
    k = len - 2
  } else {
    throw "Reduce of empty array with no initial value"
  }

  for (const i of $range(k + 1, 1, -1)) {
    accumulator = callbackFn(accumulator, this[i - 1], i - 1, this)
  }

  return accumulator
}
