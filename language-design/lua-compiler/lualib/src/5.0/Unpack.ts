/** @noSelfInFile */
export function __TS__Unpack<T>(list: T[], i: number, j?: number): LuaMultiReturn<T[]> {
  if (i === 1 && j === undefined) {
    return unpack(list)
  } else {
    j ??= list.length
    const slice: T[] = []
    for (let n = i; n <= j; n++) {
      slice[n - i] = list[n - 1]
    }
    return $multi(...slice)
  }
}
