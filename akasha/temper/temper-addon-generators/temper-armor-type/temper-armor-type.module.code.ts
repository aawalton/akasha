import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const ARMOR_TYPE_EAV_SCHEMA = z
  .object({
    key: z.string().min(1),
    armorMultiplier: z.number().nonnegative(),
    isLargeEnchantSlot: z.boolean(),
    validSlots: z.array(z.string().min(1)).min(1),
  })
  .strict()

interface ParsedArmorType {
  key: string
  name: string
  armorMultiplier: number
  isLargeEnchantSlot: boolean
  validSlots: readonly string[]
}

function parseArmorType(row: Page): ParsedArmorType {
  if (row.title === null) {
    throw new Error(`temper-armor-type row ${row.id} has null title`)
  }
  const eav = ARMOR_TYPE_EAV_SCHEMA.parse({
    key: row.key,
    armorMultiplier: row.armorMultiplier,
    isLargeEnchantSlot: row.isLargeEnchantSlot,
    validSlots: row.validSlots,
  })
  return {
    key: eav.key,
    name: row.title,
    armorMultiplier: eav.armorMultiplier,
    isLargeEnchantSlot: eav.isLargeEnchantSlot,
    validSlots: eav.validSlots,
  }
}

export function generateTemperArmorType(rows: readonly Page[]): string {
  const parsed = rows.map(parseArmorType)

  const sorted = [...parsed].sort((a, b) => a.key.localeCompare(b.key))

  const entries = sorted.map((at) => {
    const validSlotsLiteral = `[${at.validSlots.map((s) => JSON.stringify(s)).join(", ")}] as const`
    return `  ${JSON.stringify(at.key)}: { id: ${JSON.stringify(at.key)} as const, name: ${JSON.stringify(at.name)}, armorMultiplier: ${at.armorMultiplier}, isLargeEnchantSlot: ${at.isLargeEnchantSlot}, validSlots: ${validSlotsLiteral} },`
  })

  return `\
/**
 * Temper Armor Types (Generated)
 *
 * ESO equipment types that use armor traits and enchantments — the 7
 * armor pieces plus Shield, sourced from the universal pages table
 * (page type: temper-armor-type).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { ArmorTypeTemplate } from "../armor-types-data"

/**
 * Keyed record. The literal-id keys flow into \`createDataFile\`'s
 * \`armorTypes.ids\` so \`(typeof armorTypes.ids)[number]\` stays a
 * literal-union typed for callers.
 */
export const TEMPER_ARMOR_TYPES_BY_ID = {
${entries.join("\n")}
} as const satisfies Record<string, ArmorTypeTemplate>
`
}
