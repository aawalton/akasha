type ArrT<T> = T[]
function asArrT<T>(value: unknown[]): ArrT<T> {
  return value as ArrT<T>
}

export function __TS__Spread<T>(this: void, iterable: string | Iterable<T>): LuaMultiReturn<T[]> {
  if (typeof iterable === "string") {
    const strArr: string[] = []
    for (const i of $range(0, iterable.length - 1)) {
      strArr[i] = iterable[i]
    }
    return $multi(...asArrT<T>(strArr))
  }

  const arr: T[] = []
  let len = 0
  for (const item of iterable) {
    len++
    arr[len - 1] = item
  }
  return $multi(...arr)
}
