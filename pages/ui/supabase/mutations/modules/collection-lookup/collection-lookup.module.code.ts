import type { PagesStore } from "akasha/pages/ui-store/collection/modules/store/store.module.code.ts"

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
