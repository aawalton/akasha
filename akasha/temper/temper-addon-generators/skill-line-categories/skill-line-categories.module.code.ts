import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"
import { rankOf } from "../rank-by-key/rank-by-key.module.code.ts"

const SKILL_LINE_CATEGORY_EAV_SCHEMA = z
  .object({
    key: z.string(),
    displayOrder: z.number().int().nonnegative(),
  })
  .strict()

interface ParsedSkillLineCategory {
  key: string
  title: string
  displayOrder: number
}

function parseSkillLineCategory(row: Page): ParsedSkillLineCategory {
  if (row.title === null) {
    throw new Error(`temper-skill-line-category row ${row.id} has null title`)
  }
  const eav = SKILL_LINE_CATEGORY_EAV_SCHEMA.parse({
    key: row.key,
    displayOrder: row.displayOrder,
  })
  return {
    key: eav.key,
    title: row.title,
    displayOrder: eav.displayOrder,
  }
}

const KEY_RANK: Record<string, number> = {
  none: 0,
  class: 1,
  weapon: 2,
  armor: 3,
  world: 4,
  guild: 5,
  "alliance-war": 6,
  racial: 7,
  craft: 8,
  companion: 9,
}

export function generateTemperSkillLineCategory(rows: readonly Page[]): string {
  const parsed = rows.map(parseSkillLineCategory)
  const sorted = [...parsed].sort((a, b) => {
    const rankDelta = rankOf(a.key, KEY_RANK) - rankOf(b.key, KEY_RANK)
    if (rankDelta !== 0) return rankDelta
    return a.key.localeCompare(b.key)
  })

  const entryLines = sorted.map((c) => {
    const keyLiteral = JSON.stringify(c.key)
    return `  ${keyLiteral}: { id: ${keyLiteral} as const, name: ${JSON.stringify(c.title)}, displayOrder: ${c.displayOrder} },`
  })

  return `\
/**
 * Temper Skill Line Categories (Generated)
 *
 * ESO skill-line category taxonomy sourced from the universal pages table
 * (page type: temper-skill-line-category).
 *
 * DO NOT EDIT — regenerate with the skill-line-categories generator.
 */

import { createDataFile } from "@akasha/utils-narrow/create-data-file"
import type { SkillLineCategoryTemplate } from "../skill-line-categories"

const SKILL_LINE_CATEGORY_DATA = {
${entryLines.join("\n")}
} satisfies Record<string, SkillLineCategoryTemplate>

export const skillLineCategories = createDataFile<SkillLineCategoryTemplate>()(
  SKILL_LINE_CATEGORY_DATA
)
`
}
