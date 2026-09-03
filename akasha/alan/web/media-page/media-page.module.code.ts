import { getPage } from "@akasha/pages-access/get"
import { getMediaPageTypeSlugs } from "@akasha/pages-access/page-type-config"
import type { PageSelect } from "@akasha/pages-access/types"
import type { Page } from "@akasha/pages-core/page-types"

export type MediaPage = {
  readonly page: Page
  readonly pageTypeSlug: string
}

/**
 * The shape a media route's `:pageId` segment must have before the route will
 * spend a page read on it. It is a cheap refusal, not the access check: every
 * path it guards goes on to establish the page or to check a signed token.
 */
export const MEDIA_UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/**
 * A media route carries a page id and no page type, but a page is read from the
 * files of a stated type. The types a media route can serve are the ones whose
 * media config says so, so the id is looked for in those and nowhere else.
 */
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
