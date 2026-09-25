import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { ShownType } from "akasha/product/wandering-inn-wiki/web/modules/innworld-reading/innworld-reading.module.code.ts"

const FRONT = "/"

type NavRow = Readonly<Record<string, unknown>>

export type Shelved = {
  readonly href: string
  readonly label: string
  readonly icon: string | null
  readonly definition: string | null
}

export type Shelf = { readonly heading: string | null; readonly under: readonly Shelved[] }

function placeOf(row: NavRow): number {
  const place = row["navPlace"]
  return typeof place === "number" ? place : Number.POSITIVE_INFINITY
}

function parentOf(row: NavRow): string | null {
  const parent = textIn(row["navParent"])
  return parent === null ? null : slugOf(parent)
}

export function shelvesOf(
  rows: readonly NavRow[],
  shownTypes: readonly ShownType[]
): readonly Shelf[] {
  const definitions = new Map(shownTypes.map((one) => [`/${one.slug}`, one.definition]))
  const placed = [...rows].sort((one, two) => placeOf(one) - placeOf(two))
  const shelvedAll = (held: readonly NavRow[]): Shelved[] => {
    const shelved: Shelved[] = []
    for (const row of held) {
      const href = textIn(row["navHref"])
      if (href === null || href === FRONT) continue
      shelved.push({
        href,
        label: textIn(row["title"]) ?? href,
        icon: textIn(row["icon"]),
        definition: definitions.get(href) ?? null,
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
