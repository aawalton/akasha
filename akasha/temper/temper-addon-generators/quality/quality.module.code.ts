import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const QUALITY_EAV_SCHEMA = z
  .object({
    qualityId: z.string().min(1),
    displayOrder: z.number().int().nonnegative(),
    available: z.boolean(),
  })
  .strict()

interface ParsedQuality {
  qualityId: string
  name: string
  displayOrder: number
  available: boolean
}

function parseQuality(row: Page): ParsedQuality {
  if (row.title === null) {
    throw new Error(`temper-quality row ${row.id} has null title`)
  }
  const eav = QUALITY_EAV_SCHEMA.parse({
    qualityId: row.qualityId,
    displayOrder: row.displayOrder,
    available: row.available,
  })
  return {
    qualityId: eav.qualityId,
    name: row.title,
    displayOrder: eav.displayOrder,
    available: eav.available,
  }
}

export function generateTemperQuality(rows: readonly Page[]): string {
  const qualities = rows.map(parseQuality)

  const sorted = [...qualities].sort((a, b) => a.displayOrder - b.displayOrder)

  const seen = new Set<number>()
  for (const q of sorted) {
    if (seen.has(q.displayOrder)) {
      throw new Error(
        `temper-quality ${q.qualityId}: duplicate displayOrder ${q.displayOrder} (codec index would be ambiguous)`
      )
    }
    seen.add(q.displayOrder)
  }

  const recordEntries = sorted.map((q) => {
    return `  ${JSON.stringify(q.qualityId)}: { id: ${JSON.stringify(q.qualityId)} as const, name: ${JSON.stringify(q.name)}, available: ${q.available} },`
  })

  return `\
/**
 * Temper Equipment Qualities (Generated)
 *
 * ESO equipment quality tiers (no-quality, normal, fine, superior, epic,
 * legendary, mythic), sourced from the universal pages table (page type:
 * temper-quality).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

interface EquipmentQualityTemplate {
  id: string
  name: string
  available: boolean
}

/**
 * Keyed record. The literal-id keys flow into \`createDataFile\`'s
 * \`equipmentQualities.ids\` so \`z.enum(equipmentQualities.ids)\` and
 * \`(typeof equipmentQualities.ids)[number]\` stay literal-union typed
 * for callers in \`build-schema.ts\` and \`build-codec-indices.ts\`.
 */
export const TEMPER_EQUIPMENT_QUALITIES_BY_ID = {
${recordEntries.join("\n")}
} satisfies Record<string, EquipmentQualityTemplate>
`
}
