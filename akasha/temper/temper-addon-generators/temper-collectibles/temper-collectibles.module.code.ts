import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const COLLECTIBLE_SCHEMA = z
  .object({
    id: z.string(),
    esoCollectibleId: z.number(),
    collectibleName: z.string(),
  })
  .strict()

const CATEGORY_SCHEMA = z
  .object({
    slug: z.string(),
    title: z.string(),
    esoCategoryIndex: z.number(),
  })
  .strict()

const SUBCATEGORY_SCHEMA = z
  .object({
    slug: z.string(),
    title: z.string(),
    parent: z.string(),
    collectibles: z.array(COLLECTIBLE_SCHEMA),
  })
  .strict()

interface OutCollectible {
  id: number
  name: string
}

interface OutSubCategory {
  name: string
  collectibles: readonly OutCollectible[]
}

interface OutCategory {
  categoryIndex: number
  name: string
  subCategories: readonly OutSubCategory[]
}

interface Held {
  parent: string
  out: OutSubCategory
}

function byName(one: { name: string }, two: { name: string }): number {
  return one.name.localeCompare(two.name)
}

function subCategoryOf(row: Page): Held {
  const held = SUBCATEGORY_SCHEMA.parse({
    slug: row.slug,
    title: row.title,
    parent: row.parent,
    collectibles: row.collectibles ?? [],
  })
  const sorted = [...held.collectibles].sort((one, two) =>
    one.collectibleName.localeCompare(two.collectibleName)
  )
  return {
    parent: held.parent,
    out: {
      name: held.title,
      collectibles: sorted.map((one) => ({ id: one.esoCollectibleId, name: one.collectibleName })),
    },
  }
}

function under(rows: readonly Page[]): ReadonlyMap<string, readonly OutSubCategory[]> {
  const found = new Map<string, OutSubCategory[]>()
  for (const row of rows) {
    if (row.parent === undefined || row.parent === null) continue
    const held = subCategoryOf(row)
    const already = found.get(held.parent)
    if (already === undefined) found.set(held.parent, [held.out])
    else already.push(held.out)
  }
  for (const held of found.values()) held.sort(byName)
  return found
}

function categoryOf(row: Page, held: ReadonlyMap<string, readonly OutSubCategory[]>): OutCategory {
  const said = CATEGORY_SCHEMA.parse({
    slug: row.slug,
    title: row.title,
    esoCategoryIndex: row.esoCategoryIndex,
  })
  const subCategories = held.get(said.slug)
  if (subCategories === undefined) {
    throw new Error(`the collectible category \`${said.slug}\` has no subcategory naming it parent`)
  }
  return { categoryIndex: said.esoCategoryIndex, name: said.title, subCategories }
}

function versionOf(catalogDomains: readonly Page[]): string {
  const found = catalogDomains.find((row) => row.slug === "collectibles")
  if (found === undefined) {
    throw new Error("no `temper-catalog-domain` page is slugged `collectibles`")
  }
  const version = found.generatorRanForVersion
  if (typeof version !== "string") {
    throw new Error("the `collectibles` catalog domain states no `generator-ran-for-version`")
  }
  return version
}

export function generateTemperCollectibles(
  rows: readonly Page[],
  catalogDomains: readonly Page[]
): string {
  const held = under(rows)
  const tops = rows.filter((row) => row.parent === undefined || row.parent === null)
  const categories = tops.map((row) => categoryOf(row, held)).sort(byName)
  const named = new Set<string>(categories.map((one) => one.name))
  if (named.size !== categories.length) {
    throw new Error("two collectible categories are titled the same, so their order is unsettled")
  }
  const subCount = categories.reduce((count, one) => count + one.subCategories.length, 0)
  const collectibleCount = categories.reduce(
    (count, one) =>
      count + one.subCategories.reduce((each, sub) => each + sub.collectibles.length, 0),
    0
  )
  return `\
/**
 * Collectibles Static Data (Generated)
 *
 * ${categories.length} categories, ${subCount} subcategories, ${collectibleCount} collectibles
 *
 * apiVersion: ${versionOf(catalogDomains)}
 * DO NOT EDIT — regenerate with: ops temper catalog generate collectibles
 */

interface CollectibleEntry {
  id: number
  name: string
}

interface CollectibleSubCategoryEntry {
  name: string
  collectibles: readonly CollectibleEntry[]
}

interface CollectibleCategoryEntry {
  categoryIndex: number
  name: string
  subCategories: readonly CollectibleSubCategoryEntry[]
}

export const collectiblesData: CollectibleCategoryEntry[] = ${JSON.stringify(categories, null, 2)}
`
}
