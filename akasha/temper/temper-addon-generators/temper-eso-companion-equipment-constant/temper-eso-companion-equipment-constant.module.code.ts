import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const KIND_SCHEMA = z.union([
  z.literal("equip-type"),
  z.literal("quality-eso-to-companion"),
  z.literal("quality-companion-to-eso"),
])

const ROW_EAV_SCHEMA = z
  .object({
    kind: KIND_SCHEMA,
    keyText: z.string().min(1),
    valueNum: z.number().nullable().default(null),
    valueText: z.string().nullable().default(null),
    displayOrder: z.number().int().nonnegative(),
  })
  .strict()

interface ParsedRow {
  kind: "equip-type" | "quality-eso-to-companion" | "quality-companion-to-eso"
  keyText: string
  valueNum: number | null
  valueText: string | null
  displayOrder: number
}

function parseRow(row: Page): ParsedRow {
  const eav = ROW_EAV_SCHEMA.parse({
    kind: row.kind,
    keyText: row.keyText,
    valueNum: row.valueNum,
    valueText: row.valueText,
    displayOrder: row.displayOrder,
  })
  if (eav.kind === "equip-type" && eav.valueNum === null) {
    throw new Error(`equip-type row '${eav.keyText}' has null valueNum`)
  }
  if (eav.kind === "quality-companion-to-eso" && eav.valueNum === null) {
    throw new Error(`quality-companion-to-eso row '${eav.keyText}' has null valueNum`)
  }
  if (eav.kind === "quality-eso-to-companion" && eav.valueText === null) {
    throw new Error(`quality-eso-to-companion row '${eav.keyText}' has null valueText`)
  }
  return eav
}

export function generateTemperEsoCompanionEquipmentConstant(rows: readonly Page[]): string {
  const parsed = rows.map(parseRow)

  const equipTypeRows = parsed
    .filter((r) => r.kind === "equip-type")
    .sort((a, b) => a.displayOrder - b.displayOrder)
  const qualityEsoToCompanionRows = parsed
    .filter((r) => r.kind === "quality-eso-to-companion")
    .sort((a, b) => a.displayOrder - b.displayOrder)
  const qualityCompanionToEsoRows = parsed
    .filter((r) => r.kind === "quality-companion-to-eso")
    .sort((a, b) => a.displayOrder - b.displayOrder)

  const equipTypeEntries = equipTypeRows.map((r) => {
    if (r.valueNum === null) throw new Error("unreachable: equip-type valueNum null")
    return `  ${r.keyText}: ${r.valueNum},`
  })

  const qualityEsoToCompanionEntries = qualityEsoToCompanionRows.map((r) => {
    if (r.valueText === null)
      throw new Error("unreachable: quality-eso-to-companion valueText null")
    return `  ${r.keyText}: ${JSON.stringify(r.valueText)},`
  })

  const qualityCompanionToEsoEntries = qualityCompanionToEsoRows.map((r) => {
    if (r.valueNum === null) throw new Error("unreachable: quality-companion-to-eso valueNum null")
    return `  ${JSON.stringify(r.keyText)}: ${r.valueNum},`
  })

  return `\
/**
 * Temper ESO Companion Equipment Constants (Generated)
 *
 * Three numeric mappings between ESO runtime equip-type / quality
 * values and Temper companion-equipment ids. Sourced from the
 * universal pages table (page type:
 * temper-eso-companion-equipment-constant).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { CompanionEquipmentQualityId } from "@akasha/temper-companions-core/companion-equipment-qualities"

/**
 * ESO equip-type name → ESO numeric constant. \`as const\` preserves
 * the literal number values so consumers using member access
 * (\`ESO_EQUIP_TYPES_GENERATED.EQUIP_TYPE_HEAD\`) see the literal
 * \`1\`, not a widened \`number\`.
 */
export const ESO_EQUIP_TYPES_GENERATED = {
${equipTypeEntries.join("\n")}
} as const

/**
 * ESO display quality number → companion-equipment-quality temper id.
 * Typed with \`CompanionEquipmentQualityId\` directly so the facade can
 * re-export without a runtime cast.
 */
export const ESO_QUALITY_TO_COMPANION_QUALITY_GENERATED: Record<
  number,
  CompanionEquipmentQualityId
> = {
${qualityEsoToCompanionEntries.join("\n")}
}

/**
 * Companion-equipment-quality temper id → ESO display quality number.
 * Includes the \`no-quality\` sentinel mapping to 5 (legendary)
 * because the codec defaults unset quality to legendary.
 */
export const COMPANION_QUALITY_TO_ESO_GENERATED: Record<string, number> = {
${qualityCompanionToEsoEntries.join("\n")}
}
`
}
