import { asPage, type Page } from "@akasha/pages-core/page-types"
import type { Json } from "@akasha/utils-narrow/json-value"
import { camelizeKey } from "../file-rows/file-rows.module.code.ts"
import { parsePageSeq } from "../parse-page-seq/parse-page-seq.module.code.ts"

export const PROMOTED_COLUMN = {
  id: "id",
  seq: "seq",
  title: "title",
  icon: "icon",
  slug: "slug",
  userId: "user_id",
  pageTypeId: "page_type_id",
  pageTypeSlug: "page_type_slug",
  uniqueKey: "unique_key",
} as const

export const PROMOTED_COLUMN_KEYS: ReadonlySet<string> = new Set(Object.keys(PROMOTED_COLUMN))

const COLUMN_TO_KEY: Record<string, string> = Object.fromEntries(
  Object.entries(PROMOTED_COLUMN).map(([k, v]) => [v, k])
)

export function fromColumn(col: string): string | null {
  return COLUMN_TO_KEY[col] ?? null
}

export function isPromotedKey(key: string): key is keyof typeof PROMOTED_COLUMN {
  return key in PROMOTED_COLUMN
}

function asJson(value: unknown): Json {
  return (value instanceof Date ? value.toISOString() : value) as Json
}

function coerceSeqInPlace(out: Record<string, Json>): undefined {
  if (!("seq" in out)) return
  const context = typeof out.id === "string" ? out.id : "flattenRow"
  out.seq = parsePageSeq(out.seq, context)
}

export function flattenRow(row: Record<string, unknown>): Page {
  const rawAttrs = row.attributes
  const hasAttrs = rawAttrs && typeof rawAttrs === "object" && !Array.isArray(rawAttrs)
  const out: Record<string, Json> = {}
  if (hasAttrs) {
    for (const [k, v] of Object.entries(rawAttrs)) out[k] = asJson(v)
    const rawContent = row.content
    if (rawContent && typeof rawContent === "object" && !Array.isArray(rawContent)) {
      for (const [k, v] of Object.entries(rawContent)) out[k] = asJson(v)
    }
    for (const [col, val] of Object.entries(row)) {
      if (col === "attributes" || col === "content") continue
      const key = fromColumn(col)
      if (key === null) continue
      out[key] = asJson(val)
    }
    coerceSeqInPlace(out)
    return asPage(out)
  }
  for (const [k, v] of Object.entries(row)) out[k] = asJson(v)
  coerceSeqInPlace(out)
  return asPage(out)
}

export function applySelect(props: Page, select?: readonly string[]): Page {
  if (!select) return props
  const out: Record<string, Json> = {}
  for (const k of select) out[k] = props[k] ?? props[camelizeKey(k)] ?? null
  return asPage(out)
}
