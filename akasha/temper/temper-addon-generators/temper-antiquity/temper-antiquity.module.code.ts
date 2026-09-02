import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const ANTIQUITY_SCHEMA = z
  .object({
    id: z.string(),
    esoAntiquityId: z.number(),
    antiquityName: z.string(),
    esoAntiquitySetId: z.number(),
    totalLoreEntries: z.number(),
  })
  .strict()

const CATEGORY_SCHEMA = z
  .object({
    title: z.string(),
    esoAntiquityCategoryId: z.number(),
    antiquities: z.array(ANTIQUITY_SCHEMA),
  })
  .strict()

interface OutAntiquity {
  antiquityId: number
  name: string
  setId: number
  totalLoreEntries: number
}

interface OutCategory {
  categoryId: number
  name: string
  antiquities: readonly OutAntiquity[]
}

function categoryOf(row: Page): OutCategory {
  const held = CATEGORY_SCHEMA.parse({
    title: row.title,
    esoAntiquityCategoryId: row.esoAntiquityCategoryId,
    antiquities: row.antiquities ?? [],
  })
  const antiquities = [...held.antiquities].sort((a, b) => a.esoAntiquityId - b.esoAntiquityId)
  return {
    categoryId: held.esoAntiquityCategoryId,
    name: held.title,
    antiquities: antiquities.map((one) => ({
      antiquityId: one.esoAntiquityId,
      name: one.antiquityName,
      setId: one.esoAntiquitySetId,
      totalLoreEntries: one.totalLoreEntries,
    })),
  }
}

function versionOf(catalogDomains: readonly Page[]): string {
  const found = catalogDomains.find((row) => row.slug === "antiquity-lore")
  if (found === undefined) {
    throw new Error("no `temper-catalog-domain` page is slugged `antiquity-lore`")
  }
  const version = found.generatorRanForVersion
  if (typeof version !== "string") {
    throw new Error("the `antiquity-lore` catalog domain states no `generator-ran-for-version`")
  }
  return version
}

function renderedFrom(categories: readonly OutCategory[]): string {
  const rendered = categories
    .map((category) => {
      const leaves = category.antiquities
        .map(
          (one) =>
            `    { antiquityId: ${one.antiquityId}, name: ${JSON.stringify(one.name)}, ` +
            `setId: ${one.setId}, totalLoreEntries: ${one.totalLoreEntries} }`
        )
        .join(",\n")
      return (
        `  { categoryId: ${category.categoryId}, name: ${JSON.stringify(category.name)}, ` +
        `antiquities: [\n${leaves}\n  ]}`
      )
    })
    .join(",\n")
  return `[\n${rendered}\n]`
}

export function generateTemperAntiquity(
  rows: readonly Page[],
  catalogDomains: readonly Page[]
): string {
  const categories = rows.map(categoryOf).sort((a, b) => a.categoryId - b.categoryId)
  const antiquityCount = categories.reduce((held, one) => held + one.antiquities.length, 0)
  return `\
/**
 * Antiquity Lore Static Data (Generated)
 *
 * ${categories.length} categories, ${antiquityCount} antiquities
 *
 * apiVersion: ${versionOf(catalogDomains)}
 * DO NOT EDIT — regenerate with: ops temper catalog generate antiquity
 */

interface AntiquityEntry {
  antiquityId: number
  name: string
  setId: number
  totalLoreEntries: number
}

interface AntiquityCategoryEntry {
  categoryId: number
  name: string
  antiquities: readonly AntiquityEntry[]
}

export const antiquityData: AntiquityCategoryEntry[] = ${renderedFrom(categories)}
`
}
