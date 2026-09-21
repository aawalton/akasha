import { __TS__Unpack } from "akasha/design/language/lua-compiler/lualib-helper/unpack/unpack.lualib-helper.lua50-code.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/sparse-array/sparse-array.type-declaration.d.ts"

export function __TS__SparseArraySpread<T>(
  this: void,
  sparseArray: __TS__SparseArray<T>
): LuaMultiReturn<T[]> {
  return __TS__Unpack(sparseArray, 1, sparseArray.sparseLength)
}
