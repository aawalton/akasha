import type { Row } from "@tools/lib/page-derive-shape"
import { listOf as listIn, textOf as textIn } from "@tools/lib/page-query-values"

export function textOf(row: Row, key: string): string | null {
  const one = textIn(row.values, key)
  return one === null || one.trim() === "" ? null : one
}

export function listOf(row: Row, key: string): readonly string[] {
  return listIn(row.values, key)
}
