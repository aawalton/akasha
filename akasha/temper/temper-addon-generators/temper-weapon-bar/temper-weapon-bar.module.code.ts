import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const WEAPON_BAR_EAV_SCHEMA = z
  .object({
    key: z.string(),
  })
  .strict()

interface ParsedWeaponBar {
  key: string
  name: string
}

function parseWeaponBar(row: Page): ParsedWeaponBar {
  if (row.title === null) {
    throw new Error(`temper-weapon-bar row ${row.id} has null title`)
  }
  const eav = WEAPON_BAR_EAV_SCHEMA.parse({
    key: row.key,
  })
  return {
    key: eav.key,
    name: row.title,
  }
}

export function generateTemperWeaponBar(rows: readonly Page[]): string {
  const parsed = rows.map(parseWeaponBar)

  const precedence: Record<string, number> = {
    "primary-weapon-bar": 0,
    "backup-weapon-bar": 1,
  }
  const sorted = [...parsed].sort((a, b) => {
    const pa = precedence[a.key] ?? 1_000
    const pb = precedence[b.key] ?? 1_000
    if (pa !== pb) return pa - pb
    return a.key.localeCompare(b.key)
  })

  const entries = sorted.map(
    (w) =>
      `  ${JSON.stringify(w.key)}: { id: ${JSON.stringify(w.key)}, name: ${JSON.stringify(w.name)} },`
  )

  return `\
/**
 * Temper Weapon Bars (Generated)
 *
 * Two weapon bars (primary and backup) available to players, sourced
 * from the universal pages table (page type: temper-weapon-bar).
 *
 * Each entry's \`id\` is the stable codec-facing identifier
 * ("primary-weapon-bar" / "backup-weapon-bar") and the same string is
 * used as the record key, so \`TEMPER_WEAPON_BARS["primary-weapon-bar"]\`
 * is well-typed and feeds the \`WeaponBar\` union and the
 * \`weaponBars.data\` lookup in @temper/game-characters-equipment.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { WeaponBarTemplate } from "../weapon-bars-data"

export const TEMPER_WEAPON_BARS = {
${entries.join("\n")}
} as const satisfies Record<string, WeaponBarTemplate>
`
}
