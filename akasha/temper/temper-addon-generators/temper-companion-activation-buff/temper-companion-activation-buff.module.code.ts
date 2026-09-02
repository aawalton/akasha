import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"
import { rankOf } from "../rank-by-key/rank-by-key.module.code.ts"

const COMPANION_ACTIVATION_BUFF_EAV_SCHEMA = z
  .object({
    key: z.string(),
  })
  .strict()

interface ParsedCompanionActivationBuff {
  key: string
  name: string
}

function parseCompanionActivationBuff(row: Page): ParsedCompanionActivationBuff {
  if (row.title === null) {
    throw new Error(`temper-companion-activation-buff row ${row.id} has null title`)
  }
  const eav = COMPANION_ACTIVATION_BUFF_EAV_SCHEMA.parse({ key: row.key })
  return { key: eav.key, name: row.title }
}

const KEY_RANK: Record<string, number> = {
  "flat-resistance": 0,
  "flat-damage-reduction": 1,
  "light-attack-damage": 2,
  "heavy-attack-damage": 3,
  "next-attack-damage": 4,
  "health-recovery": 5,
  "magicka-recovery": 6,
  "stamina-recovery": 7,
  "healing-received": 8,
  "damage-taken-increase": 9,
}

export function generateTemperCompanionActivationBuff(rows: readonly Page[]): string {
  const parsed = rows.map(parseCompanionActivationBuff)
  const sorted = [...parsed].sort((a, b) => {
    const rankDelta = rankOf(a.key, KEY_RANK) - rankOf(b.key, KEY_RANK)
    if (rankDelta !== 0) return rankDelta
    return a.key.localeCompare(b.key)
  })

  const entryLines = sorted.map((r) => {
    const keyLiteral = JSON.stringify(r.key)
    return `  ${keyLiteral}: { id: ${keyLiteral} as const, name: ${JSON.stringify(r.name)} },`
  })

  return `\
/**
 * Temper Companion Activation Buffs (Generated)
 *
 * Companion-specific buff / debuff label fallbacks used by
 * \`effect-labels.ts\` when a buff key is not present in the shared
 * \`buff-or-debuff-source\`. Sourced from the universal pages table
 * (page type: temper-companion-activation-buff).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import { createDataFile } from "@akasha/utils-narrow/create-data-file"
import type { CompanionActivationBuffTemplate } from "../companion-activation-buff-data"

const COMPANION_ACTIVATION_BUFF_DATA = {
${entryLines.join("\n")}
} satisfies Record<string, CompanionActivationBuffTemplate>

export const companionActivationBuffs = createDataFile<CompanionActivationBuffTemplate>()(
  COMPANION_ACTIVATION_BUFF_DATA
)
`
}
