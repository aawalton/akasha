import { __TS__CountVarargs } from "./CountVarargs"

export function __TS__ArrayReduce<TElement>(
  this: TElement[],
  callbackFn: (
    accumulator: TElement,
    currentValue: TElement,
    index: number,
    array: TElement[]
  ) => TElement
): TElement
export function __TS__ArrayReduce<TElement, TAccumulator>(
  this: TElement[],
  callbackFn: (
    accumulator: TAccumulator,
    currentValue: TElement,
    index: number,
    array: TElement[]
  ) => TAccumulator,
  initial: TAccumulator
): TAccumulator
export function __TS__ArrayReduce<TAccumulator, TElement extends TAccumulator>(
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
    k = 0
  } else if (len > 0) {
    accumulator = this[0]
    k = 1
  } else {
    throw "Reduce of empty array with no initial value"
  }

  for (const i of $range(k + 1, len)) {
    accumulator = callbackFn(accumulator, this[i - 1], i - 1, this)
  }

  return accumulator
}
