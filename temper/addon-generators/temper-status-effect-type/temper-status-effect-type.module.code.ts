import { z } from "zod"
import { statusEffectTypes } from "../../skill-kinds/status-effect-types/status-effect-types.module.code.ts"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"
import { ranksOf } from "../rank-by-key/rank-by-key.module.code.ts"

const STATUS_EFFECT_TYPE_EAV_SCHEMA = z
  .object({
    key: z.string(),
  })
  .strict()

interface ParsedStatusEffectType {
  key: string
  name: string
}

function parseStatusEffectType(row: Page): ParsedStatusEffectType {
  if (row.title === null) {
    throw new Error(`temper-status-effect-type row ${row.id} has null title`)
  }
  const eav = STATUS_EFFECT_TYPE_EAV_SCHEMA.parse({
    key: row.key,
  })
  return {
    key: eav.key,
    name: row.title,
  }
}

export function generateTemperStatusEffectType(rows: readonly Page[]): string {
  const parsed = rows.map(parseStatusEffectType)

  const precedence: Record<string, number> = ranksOf(statusEffectTypes.ids)
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
 * Temper Status Effect Types (Generated)
 *
 * Twelve status-effect kinds — stun, fear, immobilize, knockback,
 * knockup, off-balance, snare, burning, chilled, concussed, taunt,
 * invisible — sourced from the universal pages table (page type:
 * temper-status-effect-type).
 *
 * Each entry's \`id\` is the stable codec-facing identifier and the same
 * string is used as the record key, so
 * \`TEMPER_STATUS_EFFECT_TYPES["stun"]\` is well-typed and feeds the
 * \`statusEffectTypes\` lookup in @temper/game-characters-skills.
 *
 * DO NOT EDIT — regenerate with: akasha temper-addon-data-generate
 */

import type { StatusEffectTypeTemplate } from "../status-effect-type-data"

export const TEMPER_STATUS_EFFECT_TYPES = {
${entries.join("\n")}
} as const satisfies Record<string, StatusEffectTypeTemplate>
`
}
