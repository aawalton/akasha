import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const JEWELRY_TYPE_EAV_SCHEMA = z
  .object({
    key: z.string().min(1),
    validSlots: z.array(z.string().min(1)).min(1),
  })
  .strict()

interface ParsedJewelryType {
  key: string
  name: string
  validSlots: readonly string[]
}

function parseJewelryType(row: Page): ParsedJewelryType {
  if (row.title === null) {
    throw new Error(`temper-jewelry-type row ${row.id} has null title`)
  }
  const eav = JEWELRY_TYPE_EAV_SCHEMA.parse({
    key: row.key,
    validSlots: row.validSlots,
  })
  return {
    key: eav.key,
    name: row.title,
    validSlots: eav.validSlots,
  }
}

export function generateTemperJewelryType(rows: readonly Page[]): string {
  const parsed = rows.map(parseJewelryType)

  const sorted = [...parsed].sort((a, b) => a.key.localeCompare(b.key))

  const entries = sorted.map((jt) => {
    const validSlotsLiteral = `[${jt.validSlots.map((s) => JSON.stringify(s)).join(", ")}] as const`
    return `  ${JSON.stringify(jt.key)}: { id: ${JSON.stringify(jt.key)} as const, name: ${JSON.stringify(jt.name)}, validSlots: ${validSlotsLiteral} },`
  })

  return `\
/**
 * Temper Jewelry Types (Generated)
 *
 * ESO equipment types that use jewelry traits and enchantments — the 2
 * jewelry pieces (necklace, ring), sourced from the universal pages table
 * (page type: temper-jewelry-type).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { JewelryTypeTemplate } from "../jewelry-types-data"

/**
 * Keyed record. The literal-id keys flow into \`createDataFile\`'s
 * \`jewelryTypes.ids\` so \`(typeof jewelryTypes.ids)[number]\` stays a
 * literal-union typed for callers.
 */
export const TEMPER_JEWELRY_TYPES_BY_ID = {
${entries.join("\n")}
} as const satisfies Record<string, JewelryTypeTemplate>
`
}
