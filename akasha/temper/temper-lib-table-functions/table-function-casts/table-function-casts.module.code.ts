export type GlobalTable = Record<string, unknown>

export type TableKey = AnyNotNil

export type Metatable = LuaMetatable<LuaTable>

export function asMetatable(value: unknown): Metatable {
  return value as Metatable
}
