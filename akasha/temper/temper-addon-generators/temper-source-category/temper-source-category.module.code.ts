import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const SOURCE_CATEGORY_EAV_SCHEMA = z
  .object({
    categoryId: z.string().min(1),
    displayOrder: z.number().int().nonnegative(),
  })
  .strict()

interface ParsedSourceCategory {
  categoryId: string
  name: string
  displayOrder: number
}

function parseSourceCategory(row: Page): ParsedSourceCategory {
  if (row.title === null) {
    throw new Error(`temper-source-category row ${row.id} has null title`)
  }
  const eav = SOURCE_CATEGORY_EAV_SCHEMA.parse({
    categoryId: row.categoryId,
    displayOrder: row.displayOrder,
  })
  return {
    categoryId: eav.categoryId,
    name: row.title,
    displayOrder: eav.displayOrder,
  }
}

export function generateTemperSourceCategory(rows: readonly Page[]): string {
  const categories = rows.map(parseSourceCategory)

  const sorted = [...categories].sort((a, b) => a.displayOrder - b.displayOrder)

  const recordEntries = sorted.map((c) => {
    const keyLiteral = JSON.stringify(c.categoryId)
    return `  ${keyLiteral}: { id: ${keyLiteral} as const, name: ${JSON.stringify(c.name)}, displayOrder: ${c.displayOrder} },`
  })

  return `\
/**
 * Temper Source Categories (Generated)
 *
 * ESO effect source categories (21 categories: base, attributes, armor,
 * jewelry, weapons, sets, food-or-drink, potions, poisons, mundus,
 * champion-points, skills, buffs, debuffs, target, account, curse,
 * companion-base, companion-armor, companion-weapons, companion-jewelry,
 * companion-skills), sourced from the universal pages table (page type:
 * temper-source-category).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

interface SourceCategoryTemplate {
  id: string
  name: string
  displayOrder: number
}

/**
 * Keyed record. The literal-id keys flow into \`createDataFile\`'s
 * \`sourceCategories.ids\` so \`(typeof sourceCategories.ids)[number]\`
 * stays literal-union typed for callers (the \`SourceCategoryId\` union
 * used by the \`EffectSourceInterface\` contract and the formula DSL's
 * \`categories\` filters).
 */
export const TEMPER_SOURCE_CATEGORY_DATA = {
${recordEntries.join("\n")}
} satisfies Record<string, SourceCategoryTemplate>
`
}
