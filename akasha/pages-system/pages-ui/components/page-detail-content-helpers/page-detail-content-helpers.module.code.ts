import { RESERVED_PROPERTY_IDS } from "@akasha/pages-ui-components/card-property-columns"
import { isRecord } from "@akasha/utils-narrow/is-record"

export const PAGE_TYPE_SLUG = "page-type"

export const DETAIL_EXCLUDED_IDS: ReadonlySet<string> = new Set(
  RESERVED_PROPERTY_IDS.filter((id) => id !== "content")
)

export function extractPageTypeId(v: unknown): string | undefined {
  if (typeof v === "string") return v
  if (isRecord(v) && typeof v.id === "string") return v.id
  return undefined
}

export type DetailBodyKind = "skeleton" | "reader" | "collection" | "default"

export function selectDetailBody({
  hasPage,
  pageIsLoading,
  hasPageType,
  displayKind,
}: {
  hasPage: boolean
  pageIsLoading: boolean
  hasPageType: boolean
  displayKind: string | undefined
}): DetailBodyKind {
  if (hasPageType) {
    if (displayKind === "reader") return "reader"
    if (displayKind === "collection") return "collection"
    return "default"
  }
  const pageNotFound = !hasPage && !pageIsLoading
  return pageNotFound ? "default" : "skeleton"
}
