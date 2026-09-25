import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

const REFUSED_BY = "TemperItemsCraftingSets: expected "

function refuse(this: void, expected: string, value: unknown): never {
  return error(REFUSED_BY + expected + ", found " + type(value), 3)
}

function isIndexable(this: void, value: unknown): value is object {
  const kind = type(value)
  return kind === "table" || kind === "userdata"
}

export type GlobalTable = Record<string, unknown>
export function asGlobalTable(value: unknown): GlobalTable {
  if (!isIndexable(value)) refuse("a table", value)
  return value as GlobalTable
}

export type Present<T> = T
export function asPresent<T>(value: T | undefined): Present<T> {
  if (value === undefined) refuse("a value", value)
  return value
}

export function asNumber(value: unknown): number {
  if (typeof value !== "number") refuse("a number", value)
  return value
}
export function asString(value: unknown): string {
  if (typeof value !== "string") refuse("a string", value)
  return value
}
export function asBoolean(value: unknown): boolean {
  if (typeof value !== "boolean") refuse("a boolean", value)
  return value
}

export type NumberOpt = number | undefined
export function asNumberOpt(value: unknown): NumberOpt {
  if (value !== undefined && typeof value !== "number") refuse("a number or nil", value)
  return value
}

export type StringOpt = string | undefined
export function asStringOpt(value: unknown): StringOpt {
  if (value !== undefined && typeof value !== "string") refuse("a string or nil", value)
  return value
}

export type BooleanOpt = boolean | undefined
export function asBooleanOpt(value: unknown): BooleanOpt {
  if (value !== undefined && typeof value !== "boolean") refuse("a boolean or nil", value)
  return value
}

export type StrRecord = { [key: string]: unknown }
export function asStrRecord(value: unknown): StrRecord {
  if (!isIndexable(value)) refuse("a table", value)
  return value as StrRecord
}

export type StrRecordOpt = StrRecord | undefined
export function asStrRecordOpt(value: unknown): StrRecordOpt {
  if (value === undefined) return undefined
  if (!isIndexable(value)) refuse("a table or nil", value)
  return value as StrRecord
}

export type NumRecord = { [setId: number]: unknown }
export function asNumRecord(value: unknown): NumRecord {
  if (!isIndexable(value)) refuse("a table", value)
  return value as NumRecord
}

export type NumRecordOpt = NumRecord | undefined
export function asNumRecordOpt(value: unknown): NumRecordOpt {
  if (value === undefined) return undefined
  if (!isIndexable(value)) refuse("a table or nil", value)
  return value as NumRecord
}

export type LangRecord = { [lang: string]: unknown }
export function asLangRecord(value: unknown): LangRecord {
  if (!isIndexable(value)) refuse("a table", value)
  return value as LangRecord
}

export type UnknownArray = unknown[]
export function asUnknownArray(value: unknown): UnknownArray {
  if (type(value) !== "table") refuse("a list", value)
  return value as UnknownArray
}

export type StringArray = string[]
export function asStringArray(value: unknown): StringArray {
  const list = asUnknownArray(value)
  for (let i = 0; i < list.length; i++) {
    if (typeof list[i] !== "string") refuse("a list of strings", list[i])
  }
  return list as StringArray
}

export type NumberArray = number[]
export function asNumberArray(value: unknown): NumberArray {
  const list = asUnknownArray(value)
  for (let i = 0; i < list.length; i++) {
    if (typeof list[i] !== "number") refuse("a list of numbers", list[i])
  }
  return list as NumberArray
}

export type NumberArrayOpt = number[] | undefined
export function asNumberArrayOpt(value: unknown): NumberArrayOpt {
  if (value === undefined) return undefined
  return asNumberArray(value)
}

export type AnyObject = object
export function asAnyObject(value: unknown): AnyObject {
  if (!isIndexable(value)) refuse("a table", value)
  return value
}
