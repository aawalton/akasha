export type GlobalTable = Record<string, unknown>

export function asGlobalTable(value: unknown): GlobalTable {
  return value as GlobalTable
}
