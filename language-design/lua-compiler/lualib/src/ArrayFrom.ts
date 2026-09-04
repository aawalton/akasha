/** @noSelfInFile */
import { __TS__Iterator } from "./Iterator"

function arrayLikeStep(
  this: ArrayLike<unknown>,
  index: number
): LuaMultiReturn<[number, unknown] | []> {
  index += 1
  if (index > this.length) return $multi()
  return $multi(index, this[index])
}

type StepSource =
  | LuaMultiReturn<[(...args: any[]) => [any, any] | [], ...any[]]>
  | LuaIterable<LuaMultiReturn<[number, unknown]>>
type ArrayLikeIterator = (
  this: void,
  arr: ArrayLike<unknown> | Iterable<unknown>
) => LuaIterable<LuaMultiReturn<[number, unknown]>>
function ArrayLikeIterator(f: (arr: any) => StepSource): ArrayLikeIterator {
  return f as ArrayLikeIterator
}

const arrayLikeIterator = ArrayLikeIterator((arr: any) => {
  if (typeof arr.length === "number") return $multi(arrayLikeStep, arr, 0)
  return __TS__Iterator(arr)
})

export function __TS__ArrayFrom(
  this: void,
  arrayLike: ArrayLike<unknown> | Iterable<unknown>,
  mapFn?: (this: unknown, element: unknown, index: number) => unknown,
  thisArg?: unknown
): unknown[] {
  const result = []
  if (mapFn === undefined) {
    for (const [, v] of arrayLikeIterator(arrayLike)) {
      result.push(v)
    }
  } else {
    let i = 0
    for (const [, v] of arrayLikeIterator(arrayLike)) {
      result.push(mapFn.call(thisArg, v, i++))
    }
  }
  return result
}
