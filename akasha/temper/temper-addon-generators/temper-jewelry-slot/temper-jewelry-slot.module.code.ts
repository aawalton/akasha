import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const JEWELRY_SLOT_EAV_SCHEMA = z
  .object({
    key: z.string().min(1),
    typeId: z.string().min(1),
    displayOrder: z.number().int().nonnegative(),
  })
  .strict()

interface ParsedJewelrySlot {
  key: string
  name: string
  typeId: string
  icon: string
  displayOrder: number
}

function parseJewelrySlot(row: Page): ParsedJewelrySlot {
  if (row.title === null) {
    throw new Error(`temper-jewelry-slot row ${row.id} has null title`)
  }
  if (typeof row.icon !== "string" || row.icon.length === 0) {
    throw new Error(`temper-jewelry-slot row ${row.id} has missing icon`)
  }
  const eav = JEWELRY_SLOT_EAV_SCHEMA.parse({
    key: row.key,
    typeId: row.typeId,
    displayOrder: row.displayOrder,
  })
  return {
    key: eav.key,
    name: row.title,
    typeId: eav.typeId,
    icon: row.icon,
    displayOrder: eav.displayOrder,
  }
}

export function generateTemperJewelrySlot(rows: readonly Page[]): string {
  const parsed = rows.map(parseJewelrySlot)

  const sorted = [...parsed].sort((a, b) => a.displayOrder - b.displayOrder)

  const seenOrder = new Set<number>()
  for (const slot of sorted) {
    if (seenOrder.has(slot.displayOrder)) {
      throw new Error(
        `temper-jewelry-slot: duplicate displayOrder ${slot.displayOrder} (key=${slot.key})`
      )
    }
    seenOrder.add(slot.displayOrder)
  }

  const entries = sorted.map(
    (slot) =>
      `  ${JSON.stringify(slot.key)}: { id: ${JSON.stringify(slot.key)} as const, name: ${JSON.stringify(slot.name)}, typeId: ${JSON.stringify(slot.typeId)} as const, icon: ${JSON.stringify(slot.icon)} },`
  )

  return `\
/**
 * Temper Jewelry Slots (Generated)
 *
 * The 3 jewelry-equipment slot positions (necklace, ring-1, ring-2),
 * sourced from the universal pages table (page type: temper-jewelry-slot).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { JewelrySlotTemplate } from "../jewelry-slots-data"

/**
 * Keyed record. The literal-id keys flow into \`createDataFile\`'s
 * \`jewelrySlots.ids\` so \`(typeof jewelrySlots.ids)[number]\` stays a
 * literal-union typed for callers (codec, schema, optimizer, UI).
 */
export const TEMPER_JEWELRY_SLOTS_BY_ID = {
${entries.join("\n")}
} as const satisfies Record<string, JewelrySlotTemplate>
`
}
