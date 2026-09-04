import { AKASHA, rootFor } from "@akasha/pages-system/checkout-roots"
import type { Roots } from "@akasha/pages-system/markdown-page-at"
import { asking, type Query, type Row } from "@akasha/pages-system-service/asking"
import { LOG } from "../orchestrator-log/orchestrator-log.module.code.ts"

export function rowsOf(roots: Roots, query: Query): readonly Row[] {
  const asked = asking(rootFor(roots, AKASHA), query)
  if ("refused" in asked) {
    throw new Error(`${LOG} \`${query.pageTypeSlug}\` went unread: ${asked.refused}`)
  }
  return asked.rows
}

export function seqIn(row: Row, key: string): number | null {
  const one = row[key]
  if (typeof one !== "string" || !/^\d+$/.test(one)) return null
  const seq = Number.parseInt(one, 10)
  return Number.isSafeInteger(seq) && seq > 0 ? seq : null
}

export function textIn(row: Row, key: string): string | null {
  const one = row[key]
  return typeof one === "string" && one.trim() !== "" ? one : null
}
