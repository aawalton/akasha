import type { PagesStore } from "@shared/pages-ui-store/collection/store"
import type { Json } from "../../../../supabase-database/src/generated/database"
import { isRecord } from "../../../../utils-narrow/src/is-record"

type PagesCollection = PagesStore["collection"]

export function resolvePageTypeId(
  collection: PagesCollection,
  pageTypeSlug: string
): string | null {
  for (const row of collection.toArray) {
    if (row.page_type_slug === "page-type" && row.slug === pageTypeSlug) {
      return row.id
    }
  }
  return null
}

export function readCurrentAttributes(
  collection: PagesCollection,
  rowId: string
): Record<string, Json> | null {
  const row = collection.get(rowId)
  if (row === undefined) return null
  const attrs = row.attributes
  if (!isRecord(attrs)) return {}
  const out: Record<string, Json> = {}
  for (const [k, v] of Object.entries(attrs)) out[k] = asJson(v)
  return out
}

function asJson(value: unknown): Json {
  return value as Json
}
