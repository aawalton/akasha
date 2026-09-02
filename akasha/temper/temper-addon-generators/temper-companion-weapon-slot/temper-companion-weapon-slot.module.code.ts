import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const COMPANION_WEAPON_SLOT_EAV_SCHEMA = z
  .object({
    key: z.string().min(1),
  })
  .strict()

interface ParsedCompanionWeaponSlot {
  key: string
  name: string
}

function parseCompanionWeaponSlot(row: Page): ParsedCompanionWeaponSlot {
  if (row.title === null) {
    throw new Error(`temper-companion-weapon-slot row ${row.id} has null title`)
  }
  const eav = COMPANION_WEAPON_SLOT_EAV_SCHEMA.parse({
    key: row.key,
  })
  return {
    key: eav.key,
    name: row.title,
  }
}

export function generateTemperCompanionWeaponSlot(rows: readonly Page[]): string {
  const parsed = rows.map(parseCompanionWeaponSlot)

  const precedence: Record<string, number> = {
    "main-hand": 0,
    "off-hand": 1,
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
 * Temper Companion Weapon Slots (Generated)
 *
 * The 2 companion weapon-equipment slot kinds -- main-hand, off-hand --
 * sourced from the universal pages table (page type:
 * temper-companion-weapon-slot). Companions have one weapon bar with
 * two slots; no poison.
 *
 * Each entry's \`id\` is the stable codec-facing identifier and the same
 * string is used as the record key, so
 * \`TEMPER_COMPANION_WEAPON_SLOTS["main-hand"]\` is well-typed and feeds
 * the \`companionWeaponSlots\` lookup in @temper/game-companions-core.
 *
 * DO NOT EDIT -- regenerate with: ops temper addon-data generate
 */

import type { CompanionWeaponSlotTemplate } from "@akasha/temper-companions-core/companion-weapon-slots"

export const TEMPER_COMPANION_WEAPON_SLOTS = {
${entries.join("\n")}
} as const satisfies Record<string, CompanionWeaponSlotTemplate>
`
}
