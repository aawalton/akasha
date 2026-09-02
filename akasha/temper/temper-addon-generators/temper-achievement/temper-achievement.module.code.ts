import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const ACHIEVEMENT_SCHEMA = z
  .object({
    id: z.string(),
    esoAchievementId: z.number(),
    name: z.string(),
    achievementPoints: z.number(),
    totalSteps: z.number(),
  })
  .strict()

const HEADING_SCHEMA = z
  .object({
    slug: z.string(),
    title: z.string(),
    category: z.enum(["account", "character"]),
    displayOrder: z.number(),
    parent: z.string().nullable().optional(),
    achievements: z.array(ACHIEVEMENT_SCHEMA),
  })
  .strict()

interface OutAchievement {
  achievementId: number
  name: string
  points: number
  totalSteps: number
}

interface Heading {
  slug: string
  title: string
  category: "account" | "character"
  displayOrder: number
  parent: string | null
  achievements: readonly OutAchievement[]
}

function headingOf(row: Page): Heading {
  const held = HEADING_SCHEMA.parse({
    slug: row.slug,
    title: row.title,
    category: row.category,
    displayOrder: row.displayOrder,
    parent: row.parent,
    achievements: row.achievements ?? [],
  })
  return {
    slug: held.slug,
    title: held.title,
    category: held.category,
    displayOrder: held.displayOrder,
    parent: held.parent ?? null,
    achievements: [...held.achievements]
      .sort((one, two) => one.esoAchievementId - two.esoAchievementId)
      .map((one) => ({
        achievementId: one.esoAchievementId,
        name: one.name,
        points: one.achievementPoints,
        totalSteps: one.totalSteps,
      })),
  }
}

function byDisplayOrder(one: Heading, two: Heading): number {
  if (one.displayOrder !== two.displayOrder) return one.displayOrder - two.displayOrder
  return one.slug.localeCompare(two.slug)
}

function renderAchievement(one: OutAchievement): string {
  return `      { achievementId: ${one.achievementId}, name: ${JSON.stringify(one.name)}, points: ${one.points}, totalSteps: ${one.totalSteps} }`
}

function renderSubCategory(one: Heading): string {
  const lines = one.achievements.map(renderAchievement).join(",\n")
  return `    { name: ${JSON.stringify(one.title)}, achievements: [\n${lines}\n    ]}`
}

function renderCategory(one: Heading, subCategories: readonly Heading[]): string {
  const lines = subCategories.map(renderSubCategory).join(",\n")
  return `  { name: ${JSON.stringify(one.title)}, subCategories: [\n${lines}\n  ]}`
}

function renderTable(headings: readonly Heading[]): string {
  const roots = headings.filter((one) => one.parent === null).sort(byDisplayOrder)
  const body = roots
    .map((root) =>
      renderCategory(root, headings.filter((one) => one.parent === root.slug).sort(byDisplayOrder))
    )
    .join(",\n")
  return `[\n${body}\n]`
}

function countedIn(headings: readonly Heading[]): number {
  return headings.reduce((held, one) => held + one.achievements.length, 0)
}

function versionOf(catalogDomains: readonly Page[]): string {
  const found = catalogDomains.find((row) => row.slug === "achievement")
  if (found === undefined) {
    throw new Error("no `temper-catalog-domain` page is slugged `achievement`")
  }
  const version = found.generatorRanForVersion
  if (typeof version !== "string") {
    throw new Error("the `achievement` catalog domain states no `generator-ran-for-version`")
  }
  return version
}

export function generateTemperAchievement(
  rows: readonly Page[],
  catalogDomains: readonly Page[]
): string {
  const headings = rows.map(headingOf)
  const account = headings.filter((one) => one.category === "account")
  const character = headings.filter((one) => one.category === "character")
  const accountRoots = account.filter((one) => one.parent === null).length
  const characterRoots = character.filter((one) => one.parent === null).length
  return `\
/**
 * Achievement Static Data (Generated)
 *
 * Account: ${accountRoots} categories, ${countedIn(account)} achievements
 * Character: ${characterRoots} categories, ${countedIn(character)} achievements
 *
 * apiVersion: ${versionOf(catalogDomains)}
 * DO NOT EDIT — regenerate with: ops temper catalog generate achievement
 */

interface AchievementEntry {
  achievementId: number
  name: string
  points: number
  totalSteps: number
}

interface AchievementSubCategoryEntry {
  name: string
  achievements: readonly AchievementEntry[]
}

interface AchievementCategoryEntry {
  name: string
  subCategories: readonly AchievementSubCategoryEntry[]
}

export const accountAchievementData: AchievementCategoryEntry[] = ${renderTable(account)}

export const characterAchievementData: AchievementCategoryEntry[] = ${renderTable(character)}
`
}
