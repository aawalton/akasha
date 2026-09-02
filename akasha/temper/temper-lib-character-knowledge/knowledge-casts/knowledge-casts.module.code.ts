import type { InternalTable, PublicTable } from "../knowledge-shape/knowledge-shape.module.code.ts"
import type { MotifData } from "../knowledge-types/knowledge-types.module.code.ts"

export function asInternalTable(value: unknown): InternalTable {
  return value as InternalTable
}

export function asPublicTable(value: unknown): PublicTable {
  return value as PublicTable
}

type Lua1Based = Record<number, string>
export function asLua1Based(value: unknown): Lua1Based {
  return value as Lua1Based
}

export function asMotifData(value: unknown): MotifData {
  return value as MotifData
}

export function asString(value: unknown): string {
  return value as string
}

export function asNumber(value: unknown): number {
  return value as number
}

export function asRecord(value: unknown): Record<string, unknown> {
  return value as Record<string, unknown>
}

type Table = Record<string | number, unknown>
export function asTable(value: unknown): Table {
  return value as Table
}

type NumberArray = number[]
export function asNumberArray(value: unknown): NumberArray {
  return value as NumberArray
}

type StringArray = string[]
export function asStringArray(value: unknown): StringArray {
  return value as StringArray
}

type Callback = (this: void, ...args: unknown[]) => void
export function asCallback(value: unknown): Callback {
  return value as Callback
}

export type GlobalTable = Record<string, unknown>

export function asGlobalTable(value: unknown): GlobalTable {
  return value as GlobalTable
}
