import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const COMPANION_JEWELRY_SLOT_EAV_SCHEMA = z
  .object({
    key: z.string().min(1),
    equipType: z.number().int().nonnegative(),
    slotCategory: z.string().min(1),
  })
  .strict()

interface ParsedCompanionJewelrySlot {
  key: string
  name: string
  equipType: number
  slotCategory: string
}

function parseCompanionJewelrySlot(row: Page): ParsedCompanionJewelrySlot {
  if (row.title === null) {
    throw new Error(`temper-companion-jewelry-slot row ${row.id} has null title`)
  }
  const eav = COMPANION_JEWELRY_SLOT_EAV_SCHEMA.parse({
    key: row.key,
    equipType: row.equipType,
    slotCategory: row.slotCategory,
  })
  return {
    key: eav.key,
    name: row.title,
    equipType: eav.equipType,
    slotCategory: eav.slotCategory,
  }
}

export function generateTemperCompanionJewelrySlot(rows: readonly Page[]): string {
  const parsed = rows.map(parseCompanionJewelrySlot)

  const precedence: Record<string, number> = {
    necklace: 0,
    "ring-1": 1,
    "ring-2": 2,
  }
  const sorted = [...parsed].sort((a, b) => {
    const pa = precedence[a.key] ?? 1_000
    const pb = precedence[b.key] ?? 1_000
    if (pa !== pb) return pa - pb
    return a.key.localeCompare(b.key)
  })

  const entryLines = sorted.map((s) => {
    const keyLiteral = JSON.stringify(s.key)
    return `  ${keyLiteral}: {
    id: ${keyLiteral} as const,
    name: ${JSON.stringify(s.name)},
    equipType: ${String(s.equipType)},
    slotCategory: ${JSON.stringify(s.slotCategory)},
  },`
  })

  return `\
/**
 * Temper Companion Jewelry Slots (Generated)
 *
 * The three positions where companion jewelry can be equipped —
 * necklace, ring-1, ring-2 — sourced from the universal pages table
 * (page type: temper-companion-jewelry-slot). Companions have the same
 * jewelry slots as player characters.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import { createDataFile } from "@akasha/utils-narrow/create-data-file"

interface CompanionJewelrySlotTemplate {
  id: string
  name: string
  equipType: number
  slotCategory: string
}

const COMPANION_JEWELRY_SLOTS_DATA = {
${entryLines.join("\n")}
} satisfies Record<string, CompanionJewelrySlotTemplate>

export const companionJewelrySlots = createDataFile<CompanionJewelrySlotTemplate>()(
  COMPANION_JEWELRY_SLOTS_DATA
)
`
}
