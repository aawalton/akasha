import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"

export type TableKey = AnyNotNil

type Metatable = LuaMetatable<LuaTable>

export function asMetatable(value: unknown): Metatable {
  return value as Metatable
}
