import { toPageTypeSlug } from "@akasha/pages-url/page-type-slug"
import { HOME_NAV_SLUG } from "../../home-dni/home-dni.module.code.ts"
import { unheld } from "../../pages-unheld/pages-unheld.module.code.ts"

const NAV_SLUG = toPageTypeSlug("nav")

// `nav` is no page type the pages system service holds, so the home nav item cannot be found and
// the page it points at cannot be drawn. This threw already wherever the query went unread; what
// has changed is that the query cannot be asked at all.
//
// The `null` this used to return for a nav item that was simply not there is not reused here.
// `HomeRoute` draws `null` as a bare "Home" heading with nothing under it, which would present a
// home page that holds nothing rather than one that went unread.
export async function readHomeNavItemParam(): Promise<string | null> {
  throw new Error(unheld(NAV_SLUG, `the \`${HOME_NAV_SLUG}\` nav item`))
}
