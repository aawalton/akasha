import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const WEAPON_TYPE_EAV_SCHEMA = z
  .object({
    key: z.string().min(1),
    esoWeaponType: z.string().min(1),
    validSlots: z.array(z.string().min(1)).min(1),
    weaponPower: z.number().nonnegative(),
    isTwoHanded: z.boolean(),
    enchantmentMultiplier: z.number().nonnegative(),
    skillLineId: z.string().default(""),
  })
  .strict()

interface ParsedWeaponType {
  key: string
  name: string
  esoWeaponType: string
  validSlots: readonly string[]
  weaponPower: number
  isTwoHanded: boolean
  enchantmentMultiplier: number
  skillLineId: string
}

function parseWeaponType(row: Page): ParsedWeaponType {
  if (row.title === null) {
    throw new Error(`temper-weapon-type row ${row.id} has null title`)
  }
  const eav = WEAPON_TYPE_EAV_SCHEMA.parse({
    key: row.key,
    esoWeaponType: row.esoWeaponType,
    validSlots: row.validSlots,
    weaponPower: row.weaponPower,
    isTwoHanded: row.isTwoHanded,
    enchantmentMultiplier: row.enchantmentMultiplier,
    skillLineId: row.skillLineId,
  })
  return {
    key: eav.key,
    name: row.title,
    esoWeaponType: eav.esoWeaponType,
    validSlots: eav.validSlots,
    weaponPower: eav.weaponPower,
    isTwoHanded: eav.isTwoHanded,
    enchantmentMultiplier: eav.enchantmentMultiplier,
    skillLineId: eav.skillLineId,
  }
}

export function generateTemperWeaponType(rows: readonly Page[]): string {
  const parsed = rows.map(parseWeaponType)

  const sorted = [...parsed].sort((a, b) => a.key.localeCompare(b.key))

  const entries = sorted.map((wt) => {
    const validSlotsLiteral = `[${wt.validSlots.map((s) => JSON.stringify(s)).join(", ")}] as const`
    return `  ${JSON.stringify(wt.key)}: { id: ${JSON.stringify(wt.key)} as const, name: ${JSON.stringify(wt.name)}, esoWeaponType: ${JSON.stringify(wt.esoWeaponType)}, validSlots: ${validSlotsLiteral}, weaponPower: ${wt.weaponPower}, isTwoHanded: ${wt.isTwoHanded}, enchantmentMultiplier: ${wt.enchantmentMultiplier}, skillLineId: ${JSON.stringify(wt.skillLineId)} },`
  })

  return `\
/**
 * Temper Weapon Types (Generated)
 *
 * ESO equipment types that use weapon traits and enchantments — 12
 * weapon types (4 one-handed melee, 3 two-handed melee, 1 bow, 3
 * destruction staves, 1 restoration staff) plus the \`no-type\`
 * empty-state sentinel. Sourced from the universal pages table
 * (page type: temper-weapon-type).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { WeaponTypeTemplate } from "../weapon-types-data"

/**
 * Keyed record. \`WeaponTypeId\` is declared in
 * \`@akasha/temper-equipment/weapon-type-ids\`, and \`weaponTypes\` is
 * annotated against that union, so a key here the union does not name
 * is a type error rather than a silent widening.
 */
export const TEMPER_WEAPON_TYPES_BY_ID = {
${entries.join("\n")}
} as const satisfies Record<string, WeaponTypeTemplate>
`
}
