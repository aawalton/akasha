import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { buildPageHref } from "akasha/page/url/modules/page-href/page-href.module.code.ts"
import { toPageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import type { ShownType } from "akasha/product/wandering-inn-wiki/web/modules/innworld-reading/innworld-reading.module.code.ts"

const FRONT = "/"

const NAV = toPageTypeSlug("nav")

type NavRow = Readonly<Record<string, unknown>>

type ViewRow = Readonly<Record<string, unknown>>

function hrefOf(row: NavRow): string | null {
  const led = textIn(row["navHref"])
  if (led !== null) return led
  const id = textIn(row["id"])
  if (id === null) return null
  return buildPageHref({
    pageTypeSlug: NAV,
    slug: textIn(row["slug"]),
    fallbackSlugSource: textIn(row["title"]),
    id,
  })
}

function listedByNav(views: readonly ViewRow[]): ReadonlyMap<string, string> {
  const listed = new Map<string, string>()
  for (const view of [...views].sort(
    (one, two) => placeOf(one, "viewPlace") - placeOf(two, "viewPlace")
  )) {
    const nav = textIn(view["nav"])
    const pageType = textIn(view["pageType"])
    if (nav === null || pageType === null || listed.has(slugOf(nav))) continue
    listed.set(slugOf(nav), slugOf(pageType))
  }
  return listed
}

export type Shelved = {
  readonly href: string
  readonly label: string
  readonly icon: string | null
  readonly definition: string | null
}

type Shelf = { readonly heading: string | null; readonly under: readonly Shelved[] }

function placeOf(row: NavRow, key: string): number {
  const place = row[key]
  return typeof place === "number" ? place : Number.POSITIVE_INFINITY
}

function parentOf(row: NavRow): string | null {
  const parent = textIn(row["navParent"])
  return parent === null ? null : slugOf(parent)
}

export function shelvesOf(
  rows: readonly NavRow[],
  shownTypes: readonly ShownType[],
  views: readonly ViewRow[]
): readonly Shelf[] {
  const definitions = new Map(shownTypes.map((one) => [one.slug, one.definition]))
  const listed = listedByNav(views)
  const typeOf = (row: NavRow, href: string): string | undefined => {
    const slug = textIn(row["slug"])
    const viewed = slug === null ? undefined : listed.get(slug)
    return viewed ?? (href.startsWith(FRONT) ? href.slice(1) : undefined)
  }
  const placed = [...rows].sort((one, two) => placeOf(one, "navPlace") - placeOf(two, "navPlace"))
  const shelvedAll = (held: readonly NavRow[]): Shelved[] => {
    const shelved: Shelved[] = []
    for (const row of held) {
      const href = hrefOf(row)
      if (href === null || href === FRONT) continue
      const type = typeOf(row, href)
      shelved.push({
        href,
        label: textIn(row["title"]) ?? href,
        icon: textIn(row["icon"]),
        definition: type === undefined ? null : (definitions.get(type) ?? null),
      })
    }
    return shelved
  }
  const roots = placed.filter((row) => parentOf(row) === null)
  const shelves: Shelf[] = []
  const loose = shelvedAll(roots.filter((row) => row["bottomSection"] !== true))
  if (loose.length > 0) shelves.push({ heading: null, under: loose })
  for (const section of roots) {
    if (section["bottomSection"] !== true) continue
    const slug = textIn(section["slug"])
    const under = shelvedAll(placed.filter((row) => slug !== null && parentOf(row) === slug))
    if (under.length === 0) continue
    shelves.push({ heading: textIn(section["title"]) ?? "", under })
  }
  return shelves
}
