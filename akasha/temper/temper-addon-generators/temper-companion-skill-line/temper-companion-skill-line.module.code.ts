import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const COMPANION_SKILL_LINE_EAV_SCHEMA = z
  .object({
    key: z.string().min(1),
    companionId: z.string().min(1),
    category: z.enum(["class", "weapon", "guild", "armor"]),
    displayOrder: z.number().int().nonnegative(),
  })
  .strict()

interface ParsedCompanionSkillLine {
  key: string
  name: string
  companionId: string
  category: "class" | "weapon" | "guild" | "armor"
  displayOrder: number
}

function parseCompanionSkillLine(row: Page): ParsedCompanionSkillLine {
  if (row.title === null) {
    throw new Error(`temper-companion-skill-line row ${row.id} has null title`)
  }
  const eav = COMPANION_SKILL_LINE_EAV_SCHEMA.parse({
    key: row.key,
    companionId: row.companionId,
    category: row.category,
    displayOrder: row.displayOrder,
  })
  return {
    key: eav.key,
    name: row.title,
    companionId: eav.companionId,
    category: eav.category,
    displayOrder: eav.displayOrder,
  }
}

export function generateTemperCompanionSkillLine(rows: readonly Page[]): string {
  const parsed = rows.map(parseCompanionSkillLine)

  const sorted = [...parsed].sort((a, b) => a.displayOrder - b.displayOrder)

  const seen = new Set<number>()
  for (const r of sorted) {
    if (seen.has(r.displayOrder)) {
      throw new Error(
        `temper-companion-skill-line ${r.key}: duplicate displayOrder ${r.displayOrder} (iteration order would be ambiguous)`
      )
    }
    seen.add(r.displayOrder)
  }

  const entryLines = sorted.map((r) => {
    const keyLiteral = JSON.stringify(r.key)
    return `  ${keyLiteral}: {
    id: ${keyLiteral} as const,
    name: ${JSON.stringify(r.name)},
    companionId: ${JSON.stringify(r.companionId)} as const,
    category: ${JSON.stringify(r.category)} as const,
  },`
  })

  return `\
/**
 * Temper Companion Skill Lines (Generated)
 *
 * All companion skill line categories — per-companion class lines plus the
 * shared weapon, guild, and armor lines — sourced from the universal pages
 * table (page type: temper-companion-skill-line).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import { createDataFile } from "@akasha/utils-narrow/create-data-file"

interface CompanionSkillLineTemplate {
  id: string
  name: string
  companionId: string
  category: "class" | "weapon" | "guild" | "armor"
}

const COMPANION_SKILL_LINES_DATA = {
${entryLines.join("\n")}
} satisfies Record<string, CompanionSkillLineTemplate>

export const companionSkillLines = createDataFile<CompanionSkillLineTemplate>()(
  COMPANION_SKILL_LINES_DATA
)
`
}
