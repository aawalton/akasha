import { askComposed } from "@shared/pages-query/ask"
import { buildPageHrefParam, PageTypeSlug } from "@shared/pages-url"
import { HOME_NAV_SLUG } from "./home-dni"

const NAV_SLUG = PageTypeSlug("nav")
const NAV_TITLE = "Home"

export function navItemParamOf(nav: Record<string, unknown>): string | null {
  const id = nav.id
  if (typeof id !== "string" || id === "") return null
  return buildPageHrefParam({
    pageTypeSlug: NAV_SLUG,
    slug: typeof nav.slug === "string" ? nav.slug : HOME_NAV_SLUG,
    fallbackSlugSource: typeof nav.title === "string" ? nav.title : NAV_TITLE,
    id,
  })
}

export async function readHomeNavItemParam(): Promise<string | null> {
  const asked = await askComposed({
    "page-type": NAV_SLUG,
    where: { slug: { is: HOME_NAV_SLUG } },
    keys: ["id", "slug", "title"],
    limit: 1,
  })
  if (!asked.ok) {
    throw new Error(`\`${NAV_SLUG}\` slugged "${HOME_NAV_SLUG}" went unread: ${asked.why}`)
  }
  const nav = asked.answer.rows[0]
  if (nav === undefined) return null
  return navItemParamOf(nav.values)
}
