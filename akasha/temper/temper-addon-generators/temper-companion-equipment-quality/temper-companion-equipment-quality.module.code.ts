import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const COMPANION_EQUIPMENT_QUALITY_EAV_SCHEMA = z
  .object({
    key: z.string().min(1),
    available: z.boolean(),
    displayOrder: z.number().int().nonnegative(),
  })
  .strict()

interface ParsedCompanionEquipmentQuality {
  key: string
  name: string
  available: boolean
  displayOrder: number
}

function parseCompanionEquipmentQuality(row: Page): ParsedCompanionEquipmentQuality {
  if (row.title === null) {
    throw new Error(`temper-companion-equipment-quality row ${row.id} has null title`)
  }
  const eav = COMPANION_EQUIPMENT_QUALITY_EAV_SCHEMA.parse({
    key: row.key,
    available: row.available,
    displayOrder: row.displayOrder,
  })
  return {
    key: eav.key,
    name: row.title,
    available: eav.available,
    displayOrder: eav.displayOrder,
  }
}

export function generateTemperCompanionEquipmentQuality(rows: readonly Page[]): string {
  const parsed = rows.map(parseCompanionEquipmentQuality)

  const sorted = [...parsed].sort((a, b) => a.displayOrder - b.displayOrder)

  const seen = new Set<number>()
  for (const r of sorted) {
    if (seen.has(r.displayOrder)) {
      throw new Error(
        `temper-companion-equipment-quality ${r.key}: duplicate displayOrder ${r.displayOrder} (iteration order would be ambiguous)`
      )
    }
    seen.add(r.displayOrder)
  }

  const entryLines = sorted.map((r) => {
    const keyLiteral = JSON.stringify(r.key)
    return `  ${keyLiteral}: {
    id: ${keyLiteral} as const,
    name: ${JSON.stringify(r.name)},
    available: ${r.available ? "true" : "false"},
  },`
  })

  return `\
/**
 * Temper Companion Equipment Qualities (Generated)
 *
 * Six equipment quality tiers — no-quality (sentinel), normal, fine,
 * superior, epic, legendary — sourced from the universal pages table
 * (page type: temper-companion-equipment-quality).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import { createDataFile } from "@akasha/utils-narrow/create-data-file"

interface CompanionEquipmentQualityTemplate {
  id: string
  name: string
  available: boolean
}

const COMPANION_EQUIPMENT_QUALITY_DATA = {
${entryLines.join("\n")}
} satisfies Record<string, CompanionEquipmentQualityTemplate>

export const companionEquipmentQualities = createDataFile<CompanionEquipmentQualityTemplate>()(
  COMPANION_EQUIPMENT_QUALITY_DATA
)
`
}
