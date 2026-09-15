import { RESERVED_PROPERTY_IDS } from "akasha/page/ui/components/modules/card-property-columns/card-property-columns.module.code.ts"
import { isRecord } from "akasha/utils/narrow/modules/is-record/is-record.module.code.ts"

export const PAGE_TYPE_SLUG = "page-type"

export const DETAIL_EXCLUDED_IDS: ReadonlySet<string> = new Set(
  RESERVED_PROPERTY_IDS.filter((id) => id !== "content")
)

export function extractPageTypeId(v: unknown): string | undefined {
  if (typeof v === "string") return v
  if (isRecord(v) && typeof v.id === "string") return v.id
  return undefined
}
