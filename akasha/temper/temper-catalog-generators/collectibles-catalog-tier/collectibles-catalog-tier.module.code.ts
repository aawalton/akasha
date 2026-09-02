import type { CollectiblesCatalogSubCategory } from "@akasha/temper-capture-shapes/collectibles-catalog"
import { collectiblesCatalogSchema } from "@akasha/temper-game-catalog-capture-host/collectibles-catalog-schema"
import {
  CATALOG_SAVED_VARIABLES,
  type Tier,
  type TierEmit,
} from "../catalog-tier/catalog-tier.module.code.ts"

function stripEsoMarkers(name: string): string {
  return name.replace(/\^[A-Za-z]+$/, "")
}

interface CollectibleEntry {
  id: number
  name: string
}

interface SubCategoryEntry {
  name: string
  collectibles: readonly CollectibleEntry[]
}

interface CategoryEntry {
  categoryIndex: number
  name: string
  subCategories: readonly SubCategoryEntry[]
}

function extractCollectiblesData(accountWide: Record<string, unknown>): readonly CategoryEntry[] {
  const rawCatalog = accountWide.collectiblesCatalog
  if (!rawCatalog)
    throw new Error(
      "No collectiblesCatalog found. Deploy the TemperCatalog addon and log in to collect it."
    )

  const catalog = collectiblesCatalogSchema.parse(rawCatalog)

  if (Object.keys(catalog.categories).length === 0)
    throw new Error("collectiblesCatalog.categories is empty or has unexpected format")

  const categories: CategoryEntry[] = []

  for (const [catIdxStr, cat] of Object.entries(catalog.categories)) {
    if (cat.name === "") continue

    const categoryIndex = Number(catIdxStr)
    const categoryName = cat.name

    const subCategories: SubCategoryEntry[] = []

    const hasNamedSubs = Object.keys(cat.subCategories).length > 0

    const generalCollectibles = extractCollectibles(cat.generalSubCategory)

    if (hasNamedSubs) {
      if (generalCollectibles.length > 0) {
        subCategories.push({ name: "General", collectibles: generalCollectibles })
      }

      for (const sub of Object.values(cat.subCategories)) {
        if (sub.name === "") continue
        const collectibles = extractCollectibles(sub)
        if (collectibles.length > 0) {
          subCategories.push({ name: sub.name, collectibles })
        }
      }
    } else if (generalCollectibles.length > 0) {
      subCategories.push({ name: "General", collectibles: generalCollectibles })
    }

    if (subCategories.length > 0) {
      subCategories.sort((a, b) => a.name.localeCompare(b.name))
      const sortedSubCategories = subCategories.map((sub) => ({
        ...sub,
        collectibles: [...sub.collectibles].sort((a, b) => a.name.localeCompare(b.name)),
      }))
      categories.push({ categoryIndex, name: categoryName, subCategories: sortedSubCategories })
    }
  }

  categories.sort((a, b) => a.name.localeCompare(b.name))

  return categories
}

function extractCollectibles(
  sub: CollectiblesCatalogSubCategory | undefined
): readonly CollectibleEntry[] {
  if (!sub) return []
  return Object.entries(sub.collectibles).flatMap(([idStr, entry]) => {
    if (entry.name === "") return []
    return [
      {
        id: Number(idStr),
        name: stripEsoMarkers(entry.name),
      },
    ]
  })
}

function generateDataFile(categories: readonly CategoryEntry[], apiVersion: string): string {
  const totalSubCategories = categories.reduce((sum, cat) => sum + cat.subCategories.length, 0)
  const totalCollectibles = categories
    .flatMap((cat) => cat.subCategories)
    .reduce((sum, sub) => sum + sub.collectibles.length, 0)

  const lines = [
    `/**`,
    ` * Collectibles Static Data (Generated)`,
    ` *`,
    ` * ${categories.length} categories, ${totalSubCategories} subcategories, ${totalCollectibles} collectibles`,
    ` *`,
    ` * apiVersion: ${apiVersion}`,
    ` * DO NOT EDIT — regenerate with: ops temper catalog generate collectibles`,
    ` */`,
    ``,
    `interface CollectibleEntry {`,
    `  id: number`,
    `  name: string`,
    `}`,
    ``,
    `interface CollectibleSubCategoryEntry {`,
    `  name: string`,
    `  collectibles: readonly CollectibleEntry[]`,
    `}`,
    ``,
    `interface CollectibleCategoryEntry {`,
    `  categoryIndex: number`,
    `  name: string`,
    `  subCategories: readonly CollectibleSubCategoryEntry[]`,
    `}`,
    ``,
    `export const collectiblesData: CollectibleCategoryEntry[] = `,
  ]

  return lines.join("\n") + JSON.stringify(categories, null, 2) + "\n"
}

export const COLLECTIBLES_TIER: Tier = {
  slug: "collectibles",
  summary: "Collectibles, by category and subcategory",
  savedVariables: CATALOG_SAVED_VARIABLES,
  outputPath: "temper/player-completion/src/generated/collectibles-data.generated.ts",
  format: false,
  emit: (accountWide, apiVersion): TierEmit => {
    const categories = extractCollectiblesData(accountWide)

    const totalCollectibles = categories
      .flatMap((cat) => cat.subCategories)
      .reduce((sum, sub) => sum + sub.collectibles.length, 0)

    return {
      content: generateDataFile(categories, apiVersion),
      report: [
        `Found ${categories.length} categories, ${totalCollectibles} collectibles (apiVersion: ${apiVersion})`,
      ],
    }
  },
}
