import { getOrderedNeighbors } from "@shared/pages-access/ordered"
import { type Page } from "@shared/pages-core/page-types"
import type { ReaderNeighborLink } from "@shared/pages-ui/components/reader-chrome"
import { buildPageHref, type PageTypeSlug } from "@shared/pages-url"

export async function resolveReaderNeighbors(args: {
  page: Page
  pageTypeSlug: PageTypeSlug
}): Promise<{ prev: ReaderNeighborLink | null; next: ReaderNeighborLink | null }> {
  const { page, pageTypeSlug } = args
  const { prev, next } = await getOrderedNeighbors({
    page,
    select: ["id", "title", "slug"],
  })
  return { prev: toNeighborLink(prev, pageTypeSlug), next: toNeighborLink(next, pageTypeSlug) }
}

function toNeighborLink(
  neighbor: Page | null,
  pageTypeSlug: PageTypeSlug
): ReaderNeighborLink | null {
  if (neighbor == null || typeof neighbor.id !== "string") return null
  const title = typeof neighbor.title === "string" ? neighbor.title : null
  return {
    href: buildPageHref({
      pageTypeSlug,
      slug: typeof neighbor.slug === "string" ? neighbor.slug : null,
      fallbackSlugSource: title,
      id: neighbor.id,
    }),
    title,
  }
}
