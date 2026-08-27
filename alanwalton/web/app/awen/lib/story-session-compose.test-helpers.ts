import { buildPageHrefParam, PageTypeSlug } from "@shared/pages-url"

export const TURN_TYPE = PageTypeSlug("game-turn")

export function expectedHref(row: Record<string, unknown>, readerBaseUrl: string | null): string {
  const title = typeof row.title === "string" ? row.title : "Untitled"
  const slug = typeof row.slug === "string" ? row.slug : null
  const param = buildPageHrefParam({
    pageTypeSlug: TURN_TYPE,
    slug,
    fallbackSlugSource: title,
    id: String(row.id),
  })
  return `${readerBaseUrl ?? ""}/game-turn/${param}`
}

export function turn(overrides: Record<string, unknown>): Record<string, unknown> {
  return {
    id: "00000000-0000-0000-0000-000000000000",
    title: "A Turn",
    slug: null,
    turnNumber: 0,
    status: "published",
    text: "prose",
    sessionNumber: 1,
    ...overrides,
  }
}
