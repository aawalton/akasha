declare const unpack:
  | (<T extends unknown[]>(this: void, list: T) => LuaMultiReturn<T>)
  | (<T>(this: void, list: T[], i: number, j?: number) => LuaMultiReturn<T[]>)
  | undefined

export function __TS__SparseArraySpread<T>(
  this: void,
  sparseArray: __TS__SparseArray<T>
): LuaMultiReturn<T[]> {
  const unpackHere = unpack ?? table.unpack
  return unpackHere(sparseArray, 1, sparseArray.sparseLength)
}
