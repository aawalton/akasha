import {
  mayRead,
  personOf,
  whereWithin,
} from "akasha/alan/harness/web-page-answer/modules/reader-access/reader-access.module.code.ts"
import { ALANWALTON_APP } from "akasha/alan/web/modules/alan-app-id/alan-app-id.module.code.ts"
import {
  grantsRoute,
  routeTargetsFor,
} from "akasha/person/modules/route-access/route-access.module.code.ts"

const NAV = "nav"

export type NavReach = {
  readonly readsNav: boolean
  readonly routes: readonly string[]
}

type NavRow = Readonly<Record<string, unknown>>

function textOf(row: NavRow, key: string): string | null {
  const said = row[key]
  return typeof said === "string" && said !== "" ? said : null
}

function reachesNavItem(reach: NavReach, row: NavRow): boolean {
  if (textOf(row, "navHref") === null) return reach.readsNav
  const slug = textOf(row, "slug")
  return slug !== null && grantsRoute(reach.routes, slug)
}

export function reachedNavItems<Row extends NavRow>(
  reach: NavReach,
  rows: readonly Row[]
): readonly Row[] {
  return rows.filter((row) => reachesNavItem(reach, row))
}

export async function navReachOf(user: object | null): Promise<NavReach> {
  const navs = whereWithin(await mayRead(user, NAV), { app: { is: ALANWALTON_APP } })
  const readsNav = "where" in navs
  const personSlug = await personOf(user)
  if (personSlug === null) return { readsNav, routes: [] }
  const held = await routeTargetsFor(personSlug)
  if (!held.ok) console.warn(`[nav-reach] ${held.why}`)
  return { readsNav, routes: held.ok ? held.targets : [] }
}
