import { getOrderedNeighbors } from "akasha/pages/access/ordered/ordered.module.code.ts"
import type { Page } from "akasha/pages/core/page-types/page-types.module.code.ts"
import type { ReaderNeighborLink } from "akasha/pages/ui/components/reader-chrome/reader-chrome.module.code.tsx"
import { pageLinkOf } from "akasha/pages/url/page-href/page-href.module.code.ts"
import type { PageTypeSlug } from "akasha/pages/url/page-type-slug/page-type-slug.module.code.ts"

export async function resolveReaderNeighbors(args: {
  page: Page
  pageTypeSlug: PageTypeSlug
}): Promise<{ prev: ReaderNeighborLink | null; next: ReaderNeighborLink | null }> {
  const { page, pageTypeSlug } = args
  const { prev, next } = await getOrderedNeighbors({
    page,
    select: ["id", "title", "slug"],
  })
  return { prev: pageLinkOf(prev, pageTypeSlug), next: pageLinkOf(next, pageTypeSlug) }
}
