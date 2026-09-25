import type { RawPageRow } from "akasha/page/access/modules/raw-page-row/raw-page-row.module.code.ts"

export type PageRow = RawPageRow

type PageRecord = Readonly<Record<string, unknown>>

type PageRowList = readonly PageRow[]

export function pageRowKey(row: PageRow): string {
  return row.id
}

export function asPageRecord(row: PageRow): PageRecord {
  return row as PageRecord
}

export function asRecord(value: unknown): Record<string, unknown> {
  return value as Record<string, unknown>
}

export function attributesOf(row: PageRow): Readonly<Record<string, unknown>> {
  const raw = asPageRecord(row).attributes
  if (raw !== null && typeof raw === "object" && !Array.isArray(raw)) {
    return asRecord(raw)
  }
  return {}
}

export function asPageRow(value: Record<string, unknown>): PageRow {
  return value as PageRow
}

export function asPageRowList(rows: readonly unknown[]): PageRowList {
  return rows as PageRowList
}
