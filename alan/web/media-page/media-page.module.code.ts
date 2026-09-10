import { getPage } from "akasha/pages/access/get/get.module.code.ts"
import { getMediaPageTypeSlugs } from "akasha/pages/access/page-type-config/page-type-config.module.code.ts"
import type { PageSelect } from "akasha/pages/access/types/types.module.code.ts"
import type { Page } from "akasha/pages/core/page-types/page-types.module.code.ts"
import { lowerUuid } from "akasha/pages/name-formats/pages/lower-uuid/lower-uuid.name-format.code.ts"

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
