export type GlobalTable = Record<string, unknown>

export function asGlobalTable(value: unknown): GlobalTable {
  return value as GlobalTable
}

export function asLuaTable(value: unknown): LuaTable {
  return value as LuaTable
}

export type TableKey = AnyNotNil

export function asTableKey(value: unknown): TableKey {
  return value as TableKey
}

export type Metatable = LuaMetatable<LuaTable>

export function asMetatable(value: unknown): Metatable {
  return value as Metatable
}

export function asNumber(value: unknown): number {
  return value as number
}

export function asString(value: unknown): string {
  return value as string
}
