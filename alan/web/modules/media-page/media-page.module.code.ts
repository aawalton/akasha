import { getPage } from "akasha/page/access/modules/get/get.module.code.ts"
import { getMediaPageTypeSlugs } from "akasha/page/access/modules/page-type-config/page-type-config.module.code.ts"
import type { PageSelect } from "akasha/page/access/modules/types/types.module.code.ts"
import type { Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import { lowerUuid } from "akasha/page/name-format/pages/lower-uuid/lower-uuid.name-format.code.ts"

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
