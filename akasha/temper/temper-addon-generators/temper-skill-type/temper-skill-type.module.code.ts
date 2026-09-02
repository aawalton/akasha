import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const SKILL_TYPE_EAV_SCHEMA = z
  .object({
    key: z.string(),
    description: z.string(),
  })
  .strict()

interface ParsedSkillType {
  key: string
  name: string
  description: string
}

function parseSkillType(row: Page): ParsedSkillType {
  if (row.title === null) {
    throw new Error(`temper-skill-type row ${row.id} has null title`)
  }
  const eav = SKILL_TYPE_EAV_SCHEMA.parse({
    key: row.key,
    description: row.description,
  })
  return {
    key: eav.key,
    name: row.title,
    description: eav.description,
  }
}

export function generateTemperSkillType(rows: readonly Page[]): string {
  const parsed = rows.map(parseSkillType)

  const precedence: Record<string, number> = {
    active: 0,
    ultimate: 1,
    passive: 2,
  }
  const sorted = [...parsed].sort((a, b) => {
    const pa = precedence[a.key] ?? 1_000
    const pb = precedence[b.key] ?? 1_000
    if (pa !== pb) return pa - pb
    return a.key.localeCompare(b.key)
  })

  const entries = sorted.map(
    (s) =>
      `  ${JSON.stringify(s.key)}: { id: ${JSON.stringify(s.key)}, name: ${JSON.stringify(s.name)}, description: ${JSON.stringify(s.description)} },`
  )

  return `\
/**
 * Temper Skill Types (Generated)
 *
 * Three skill ability types in ESO — active, ultimate, passive — sourced
 * from the universal pages table (page type: temper-skill-type).
 *
 * Each entry's \`id\` is the stable codec-facing identifier ("active" /
 * "ultimate" / "passive") and the same string is used as the record key,
 * so \`TEMPER_SKILL_TYPES["active"]\` is well-typed and feeds the
 * \`SkillTypeId\` union exported by @temper/game-characters-skills.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { SkillTypeTemplate } from "../skill-types-data"

export const TEMPER_SKILL_TYPES = {
${entries.join("\n")}
} as const satisfies Record<string, SkillTypeTemplate>
`
}
