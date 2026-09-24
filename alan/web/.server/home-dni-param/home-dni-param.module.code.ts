import { ALANWALTON_APP } from "akasha/alan/web/modules/alan-app-id/alan-app-id.module.code.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type {
  Asked,
  Query,
  Row,
} from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import { askingFor } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

const HOME_NAV_ITEM = "the home screen's nav item"

const EVERY_NAV_ITEM: Query = {
  pageTypeSlug: "nav",
  where: { app: { is: ALANWALTON_APP } },
  keys: ["slug", "id", "navPlace", "navParent", "mobilePinOrder"],
}

function placeOf(row: Row): number {
  const place = row["navPlace"]
  return typeof place === "number" ? place : Number.POSITIVE_INFINITY
}

function inNavOrder(rows: readonly Row[]): readonly Row[] {
  const sorted = [...rows].sort((one, two) => placeOf(one) - placeOf(two))
  const slugs = new Set(sorted.map((row) => row["slug"]))
  const parentOf = (row: Row): string | null => {
    const named = row["navParent"]
    if (typeof named !== "string") return null
    const parent = slugOf(named)
    return slugs.has(parent) ? parent : null
  }
  const ordered: Row[] = []
  for (const root of sorted) {
    if (parentOf(root) !== null) continue
    ordered.push(root)
    for (const child of sorted) if (parentOf(child) === root["slug"]) ordered.push(child)
  }
  return ordered
}

function pinned(row: Row): boolean {
  return typeof row["mobilePinOrder"] === "number"
}

function idOf(row: Row | undefined): string | null {
  const id = row?.["id"]
  return typeof id === "string" && id.length > 0 ? id : null
}

function homeNavItemIdIn(asked: Asked): string | null {
  if ("refused" in asked) {
    throw new Error(`${HOME_NAV_ITEM} went unread: ${asked.refused}`)
  }
  const ordered = inNavOrder(asked.rows)
  return idOf(ordered.find(pinned) ?? ordered[0])
}

export async function readHomeNavItemParam(): Promise<string | null> {
  return homeNavItemIdIn(await askingFor(EVERY_NAV_ITEM))
}
