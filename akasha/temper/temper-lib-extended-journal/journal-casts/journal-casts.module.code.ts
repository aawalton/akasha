import type {
  InternalTable,
  PublicTable,
  TabData,
} from "../journal-shape/journal-shape.module.code.ts"

type GlobalTable = Record<string, unknown>
export function asGlobalTable(value: unknown): GlobalTable {
  return value as GlobalTable
}

export function asTooltipControl(value: unknown): TooltipControl {
  return value as TooltipControl
}

export function asOptionalString(value: unknown): string | undefined {
  return value as string | undefined
}

export function asBoolean(value: unknown): boolean {
  return value as boolean
}

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

export function asTabData(value: unknown): TabData {
  return value as TabData
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

type StringArray = string[]
export function asStringArray(value: unknown): StringArray {
  return value as StringArray
}

type Callback = (this: void, ...args: unknown[]) => void
export function asCallback(value: unknown): Callback {
  return value as Callback
}

export function asControl(value: unknown): Control {
  return value as Control
}

export function asLabelControl(value: unknown): LabelControl {
  return value as LabelControl
}

export function asZoComboBox(value: unknown): ZoComboBox {
  return value as ZoComboBox
}

export function parseHookArgs(this: void, args: never[]): unknown[] {
  return args
}
