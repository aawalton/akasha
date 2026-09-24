import "akasha/design/language/lua-compiler/eso-sandbox-additions/eso-sandbox-additions.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/sparse-array/sparse-array.type-declaration.d.ts"

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
