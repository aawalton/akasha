import { __TS__Unpack } from "akasha/design/language/lua-compiler/lualibs/unpack/unpack.lualib.lua50-code.ts"

export function __TS__SparseArraySpread<T>(
  this: void,
  sparseArray: __TS__SparseArray<T>
): LuaMultiReturn<T[]> {
  return __TS__Unpack(sparseArray, 1, sparseArray.sparseLength)
}
