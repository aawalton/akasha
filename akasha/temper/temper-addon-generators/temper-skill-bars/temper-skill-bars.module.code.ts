import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const SKILL_BAR_EAV_SCHEMA = z
  .object({
    key: z.string(),
  })
  .strict()

interface ParsedSkillBar {
  key: string
  name: string
}

function parseSkillBar(row: Page): ParsedSkillBar {
  if (row.title === null) {
    throw new Error(`temper-skill-bar row ${row.id} has null title`)
  }
  const eav = SKILL_BAR_EAV_SCHEMA.parse({
    key: row.key,
  })
  return {
    key: eav.key,
    name: row.title,
  }
}

export function generateTemperSkillBar(rows: readonly Page[]): string {
  const parsed = rows.map(parseSkillBar)

  const precedence: Record<string, number> = {
    "primary-skill-bar": 0,
    "backup-skill-bar": 1,
  }
  const sorted = [...parsed].sort((a, b) => {
    const pa = precedence[a.key] ?? 1_000
    const pb = precedence[b.key] ?? 1_000
    if (pa !== pb) return pa - pb
    return a.key.localeCompare(b.key)
  })

  const entries = sorted.map(
    (s) =>
      `  ${JSON.stringify(s.key)}: { id: ${JSON.stringify(s.key)}, name: ${JSON.stringify(s.name)} },`
  )

  return `\
/**
 * Temper Skill Bars (Generated)
 *
 * Two skill bars (primary and backup) available to players, sourced
 * from the universal pages table (page type: temper-skill-bar).
 *
 * Each entry's \`id\` is the stable codec-facing identifier
 * ("primary-skill-bar" / "backup-skill-bar") and the same string is
 * used as the record key, so \`TEMPER_SKILL_BARS["primary-skill-bar"]\`
 * is well-typed and feeds the \`SkillBarId\` union and the
 * \`skillBars.data\` lookup in @temper/game-characters-skills.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { SkillBarTemplate } from "../skill-bars-data"

export const TEMPER_SKILL_BARS = {
${entries.join("\n")}
} as const satisfies Record<string, SkillBarTemplate>
`
}
