import type { Asked, Query } from "@akasha/pages-service/asking"
import { askingFor } from "@akasha/pages-service/calling"
import { HOME_NAV_SLUG } from "../../home-dni/home-dni.module.code.ts"

const HOME_NAV_ITEM = `the \`${HOME_NAV_SLUG}\` nav item`

const EVERY_NAV_ITEM: Query = {
  pageTypeSlug: "nav",
  keys: ["slug", "id"],
}

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

export async function readHomeNavItemParam(): Promise<string | null> {
  return homeNavItemIdIn(await askingFor(EVERY_NAV_ITEM))
}
