import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const SKILL_SLOT_EAV_SCHEMA = z
  .object({
    key: z.string(),
  })
  .strict()

interface ParsedSkillSlot {
  key: string
  name: string
}

function parseSkillSlot(row: Page): ParsedSkillSlot {
  if (row.title === null) {
    throw new Error(`temper-skill-slot row ${row.id} has null title`)
  }
  const eav = SKILL_SLOT_EAV_SCHEMA.parse({
    key: row.key,
  })
  return {
    key: eav.key,
    name: row.title,
  }
}

export function generateTemperSkillSlot(rows: readonly Page[]): string {
  const parsed = rows.map(parseSkillSlot)

  const precedence: Record<string, number> = {
    "active-1": 0,
    "active-2": 1,
    "active-3": 2,
    "active-4": 3,
    "active-5": 4,
    ultimate: 5,
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
 * Temper Skill Slots (Generated)
 *
 * Six skill slots per skill bar (5 active + 1 ultimate), sourced from
 * the universal pages table (page type: temper-skill-slot).
 *
 * Each entry's \`id\` is the stable codec-facing identifier
 * ("active-1"..."active-5" / "ultimate") and the same string is used as
 * the record key, so \`TEMPER_SKILL_SLOTS["ultimate"]\` is well-typed and
 * feeds the \`SkillSlotId\` union and the \`skillSlots.data\` lookup in
 * @temper/game-characters-skills.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { SkillSlotTemplate } from "../skill-slots-data"

export const TEMPER_SKILL_SLOTS = {
${entries.join("\n")}
} as const satisfies Record<string, SkillSlotTemplate>
`
}
