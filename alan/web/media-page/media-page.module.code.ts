import type { Page } from "@akasha/pages/core/page-types"
import { lowerUuid } from "@akasha/pages/name-format/lower-uuid"
import { getPage } from "@akasha/pages-access/get"
import { getMediaPageTypeSlugs } from "@akasha/pages-access/page-type-config"
import type { PageSelect } from "@akasha/pages-access/types"

export type MediaPage = {
  readonly page: Page
  readonly pageTypeSlug: string
}

export function isMediaPageId(pageId: string): boolean {
  return lowerUuid(pageId.toLowerCase())
}

export async function resolveMediaPage(
  pageId: string,
  select?: PageSelect
): Promise<MediaPage | null> {
  for (const pageTypeSlug of await getMediaPageTypeSlugs()) {
    const page = await getPage({ pageTypeSlug, where: [{ key: "id", eq: pageId }], select })
    if (page !== null) return { page, pageTypeSlug }
  }
  return null
}
