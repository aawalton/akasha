import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const COMPANION_WEAPON_TYPE_EAV_SCHEMA = z
  .object({
    key: z.string().min(1),
    isTwoHanded: z.boolean(),
    isOffHandOnly: z.boolean(),
    displayOrder: z.number().int().nonnegative(),
  })
  .strict()

interface ParsedCompanionWeaponType {
  key: string
  name: string
  isTwoHanded: boolean
  isOffHandOnly: boolean
  displayOrder: number
}

function parseCompanionWeaponType(row: Page): ParsedCompanionWeaponType {
  if (row.title === null) {
    throw new Error(`temper-companion-weapon-type row ${row.id} has null title`)
  }
  const eav = COMPANION_WEAPON_TYPE_EAV_SCHEMA.parse({
    key: row.key,
    isTwoHanded: row.isTwoHanded,
    isOffHandOnly: row.isOffHandOnly,
    displayOrder: row.displayOrder,
  })
  return {
    key: eav.key,
    name: row.title,
    isTwoHanded: eav.isTwoHanded,
    isOffHandOnly: eav.isOffHandOnly,
    displayOrder: eav.displayOrder,
  }
}

export function generateTemperCompanionWeaponType(rows: readonly Page[]): string {
  const parsed = rows.map(parseCompanionWeaponType)

  const sorted = [...parsed].sort((a, b) => a.displayOrder - b.displayOrder)

  const seen = new Set<number>()
  for (const r of sorted) {
    if (seen.has(r.displayOrder)) {
      throw new Error(
        `temper-companion-weapon-type ${r.key}: duplicate displayOrder ${r.displayOrder} (iteration order would be ambiguous)`
      )
    }
    seen.add(r.displayOrder)
  }

  const entryLines = sorted.map((r) => {
    const keyLiteral = JSON.stringify(r.key)
    const offHandLine = r.isOffHandOnly ? `\n    isOffHandOnly: true,` : ""
    return `  ${keyLiteral}: {
    id: ${keyLiteral} as const,
    name: ${JSON.stringify(r.name)},
    isTwoHanded: ${r.isTwoHanded},${offHandLine}
  },`
  })

  return `\
/**
 * Temper Companion Weapon Types (Generated)
 *
 * All weapon types companions can equip — one-handed melee, two-handed
 * melee, bow, destruction staves, restoration staff, and shield — plus
 * the \`no-type\` empty-state sentinel. Sourced from the universal pages
 * table (page type: temper-companion-weapon-type).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import { createDataFile } from "@akasha/utils-narrow/create-data-file"

interface CompanionWeaponTypeTemplate {
  id: string
  name: string
  isTwoHanded: boolean
  /** If true, can only be equipped in off-hand slot */
  isOffHandOnly?: boolean
}

const COMPANION_WEAPON_TYPE_DATA = {
${entryLines.join("\n")}
} satisfies Record<string, CompanionWeaponTypeTemplate>

export const companionWeaponTypes = createDataFile<CompanionWeaponTypeTemplate>()(
  COMPANION_WEAPON_TYPE_DATA
)
`
}
