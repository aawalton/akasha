import type { Asked, Query } from "@akasha/pages-service/asking"
import { askingFor } from "@akasha/pages-service/calling"
import { HOME_NAV_SLUG } from "../../home-dni/home-dni.module.code.ts"

const HOME_NAV_ITEM = `the \`${HOME_NAV_SLUG}\` nav item`

const EVERY_NAV_ITEM: Query = {
  pageTypeSlug: "nav",
  keys: ["slug", "id"],
}

// A REFUSAL AND AN ABSENCE ARE ANSWERED DIFFERENTLY. `HomeRoute` draws `null` as a bare "Home"
// heading with nothing under it, which is right where the nav items hold no `home` item and wrong
// where the question went unread. So a question the service refuses throws carrying the service's
// own words, and `null` is answered only where the service answered and no row carried the `home`
// slug.
//
// The slug is matched over the rows rather than in the `where`. Which nav item is the home one is
// the one thing this reads for, and reading it off the rows keeps the refusal above able to tell
// an unread set from a set holding no home item.
export function homeNavItemIdIn(asked: Asked): string | null {
  if ("refused" in asked) {
    throw new Error(`${HOME_NAV_ITEM} went unread: ${asked.refused}`)
  }
  for (const row of asked.rows) {
    if (row["slug"] !== HOME_NAV_SLUG) continue
    const id = row["id"]
    if (typeof id === "string" && id.length > 0) return id
  }
  return null
}

// `nav` IS A PAGE TYPE THE PAGES SYSTEM SERVICE HOLDS. This threw for every caller while the nav
// page types were outside akasha. Those page types landed, and `slug` and `id` are keys the `nav`
// page type declares, so the home nav item's id comes back from a question asked here.
export async function readHomeNavItemParam(): Promise<string | null> {
  return homeNavItemIdIn(await askingFor(EVERY_NAV_ITEM))
}
