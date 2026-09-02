import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const SKILL_LINE_EAV_SCHEMA = z
  .object({
    key: z.string().min(1),
    subcategoryId: z.string().min(1),
    class: z.string().min(1).optional(),
    displayOrder: z.number().int().nonnegative(),
    esoSkillLineId: z.number().int().nonnegative(),
    maxRank: z.number().int().nonnegative(),
  })
  .strict()

interface ParsedSkillLine {
  key: string
  name: string
  subcategoryId: string
  class: string | undefined
  displayOrder: number
  esoSkillLineId: number
  maxRank: number
}

function parseSkillLine(row: Page): ParsedSkillLine {
  if (row.title === null) {
    throw new Error(`temper-skill-line row ${row.id} has null title`)
  }
  const eav = SKILL_LINE_EAV_SCHEMA.parse({
    key: row.key,
    subcategoryId: row.subcategoryId,
    class: row.class,
    displayOrder: row.displayOrder,
    esoSkillLineId: row.esoSkillLineId,
    maxRank: row.maxRank,
  })
  return {
    key: eav.key,
    name: row.title,
    subcategoryId: eav.subcategoryId,
    class: eav.class,
    displayOrder: eav.displayOrder,
    esoSkillLineId: eav.esoSkillLineId,
    maxRank: eav.maxRank,
  }
}

export function generateTemperSkillLine(rows: readonly Page[]): string {
  const parsed = rows.map(parseSkillLine)

  const sorted = [...parsed].sort((a, b) => {
    if (a.displayOrder !== b.displayOrder) return a.displayOrder - b.displayOrder
    return a.key.localeCompare(b.key)
  })

  const entryLines = sorted.map((r) => {
    const keyLiteral = JSON.stringify(r.key)
    const fields: string[] = []
    fields.push(`    id: ${keyLiteral} as const`)
    fields.push(`    name: ${JSON.stringify(r.name)}`)
    fields.push(`    subcategoryId: ${JSON.stringify(r.subcategoryId)} as const`)
    if (r.class !== undefined) {
      fields.push(`    class: ${JSON.stringify(r.class)}`)
    }
    fields.push(`    displayOrder: ${r.displayOrder}`)
    fields.push(`    esoSkillLineId: ${r.esoSkillLineId}`)
    fields.push(`    maxRank: ${r.maxRank}`)
    return `  ${keyLiteral}: {
${fields.join(",\n")},
  },`
  })

  return `\
/**
 * Temper Skill Lines (Generated)
 *
 * All ESO skill lines (107 rows: class, weapon, armor, world, guild,
 * alliance-war, racial, craft, companion, plus the no-skill-line null
 * state) sourced from the universal pages table (page type:
 * temper-skill-line).
 *
 * The optional \`class\` field is present only on rows whose
 * \`subcategoryId === "class"\`. The \`("class" in line)\` discriminator
 * in \`skill-lines-data.ts\` continues to distinguish class lines from
 * the rest.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import { createDataFile } from "@akasha/utils-narrow/create-data-file"
import type { SkillLineTemplate } from "../skill-lines-data"

const SKILL_LINES_DATA = {
${entryLines.join("\n")}
} satisfies Record<string, SkillLineTemplate>

export const skillLines = createDataFile<SkillLineTemplate>()(SKILL_LINES_DATA)
`
}
