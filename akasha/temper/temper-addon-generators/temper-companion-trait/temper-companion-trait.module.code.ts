import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"
import { renderConstOrNull } from "../render-const-or-null/render-const-or-null.module.code.ts"
import { renderQualityValues } from "../render-quality-values/render-quality-values.module.code.ts"

const FLAT_QUALITY_VALUES_SCHEMA = z
  .object({
    normal: z.number(),
    fine: z.number(),
    superior: z.number(),
    epic: z.number(),
    legendary: z.number(),
  })
  .strict()

const COMPANION_TRAIT_EAV_SCHEMA = z
  .object({
    key: z.string().min(1),
    description: z.string().default(""),
    metricId: z.string().min(1).nullable().default(null),
    effectType: z
      .union([z.literal("fractional-change"), z.literal("integer")])
      .nullable()
      .default(null),
    isReduction: z.boolean(),
    qualityValues: FLAT_QUALITY_VALUES_SCHEMA.nullable(),
  })
  .strict()

interface ParsedCompanionTrait {
  key: string
  name: string
  description: string
  metricId: string | null
  effectType: "fractional-change" | "integer" | null
  isReduction: boolean
  qualityValues: z.infer<typeof FLAT_QUALITY_VALUES_SCHEMA> | null
}

function parseCompanionTrait(row: Page): ParsedCompanionTrait {
  if (row.title === null) {
    throw new Error(`temper-companion-trait row ${row.id} has null title`)
  }
  const eav = COMPANION_TRAIT_EAV_SCHEMA.parse({
    key: row.key,
    description: row.description,
    metricId: row.metricId,
    effectType: row.type,
    isReduction: row.isReduction,
    qualityValues: row.qualityValues,
  })
  return {
    key: eav.key,
    name: row.title,
    description: eav.description,
    metricId: eav.metricId,
    effectType: eav.effectType,
    isReduction: eav.isReduction,
    qualityValues: eav.qualityValues,
  }
}

export function generateTemperCompanionTrait(rows: readonly Page[]): string {
  const parsed = rows.map(parseCompanionTrait)

  const precedence: Record<string, number> = {
    "no-trait": 0,
    aggressive: 1,
    augmented: 2,
    bolstered: 3,
    focused: 4,
    prolific: 5,
    quickened: 6,
    shattering: 7,
    soothing: 8,
    vigorous: 9,
  }
  const sorted = [...parsed].sort((a, b) => {
    const pa = precedence[a.key] ?? 1_000
    const pb = precedence[b.key] ?? 1_000
    if (pa !== pb) return pa - pb
    return a.key.localeCompare(b.key)
  })

  const entries = sorted.map((t) => {
    const qualityValues = t.qualityValues === null ? "null" : renderQualityValues(t.qualityValues)
    return `  ${JSON.stringify(t.key)}: { id: ${JSON.stringify(t.key)} as const, name: ${JSON.stringify(t.name)}, description: ${JSON.stringify(t.description)}, metricId: ${renderConstOrNull(t.metricId)}, effectType: ${renderConstOrNull(t.effectType)}, isReduction: ${t.isReduction}, qualityValues: ${qualityValues} },`
  })

  return `\
/**
 * Temper Companion Traits (Generated)
 *
 * Companion equipment trait definitions -- 9 real traits (aggressive,
 * augmented, bolstered, focused, prolific, quickened, shattering,
 * soothing, vigorous) plus the \`no-trait\` sentinel that represents an
 * unassigned trait. Each entry carries its metric mapping (\`metricId\`,
 * \`effectType\`, \`isReduction\`) plus the per-quality numeric values.
 * Sourced from the universal pages table (page type:
 * temper-companion-trait).
 *
 * The sentinel \`no-trait\` row carries \`null\` for \`metricId\`,
 * \`effectType\`, and \`qualityValues\`; consumers (the
 * \`getCompanionTraitMetricEffect\` helper in @temper/game-companions-core) gate
 * on those nulls.
 *
 * Each entry's \`id\` is the stable codec-facing identifier and the
 * same string is used as the record key, so
 * \`TEMPER_COMPANION_TRAITS["aggressive"]\` is well-typed and feeds the
 * \`companionTraits\` lookup in @temper/game-companions-core.
 *
 * DO NOT EDIT -- regenerate with: ops temper addon-data generate
 */

import type { CompanionTraitTemplate } from "@akasha/temper-companions-core/companion-traits"

export const TEMPER_COMPANION_TRAITS = {
${entries.join("\n")}
} as const satisfies Record<string, CompanionTraitTemplate>
`
}
