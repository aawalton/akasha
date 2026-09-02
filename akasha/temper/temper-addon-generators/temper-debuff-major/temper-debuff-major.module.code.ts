import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"
import { renderBuffEffectEntry } from "../render-buff-effect-entry/render-buff-effect-entry.module.code.ts"

const SCALAR_EFFECT_SCHEMA = z
  .object({
    metricId: z.string().min(1),
    effectType: z.enum(["integer", "fractional-change", "number"]),
    effectValue: z.number(),
  })
  .strict()

const PER_SECONDS_EFFECT_SCHEMA = z
  .object({
    metricId: z.string().min(1),
    effectType: z.enum([
      "number-per-seconds",
      "number-for-seconds",
      "fractional-change-for-seconds",
    ]),
    effectValue: z.object({ value: z.number(), seconds: z.number() }).strict(),
  })
  .strict()

const EFFECT_ENTRY_SCHEMA = z.union([SCALAR_EFFECT_SCHEMA, PER_SECONDS_EFFECT_SCHEMA])

const DEBUFF_MAJOR_EAV_SCHEMA = z
  .object({
    debuffId: z.string().min(1),
    description: z.string().default(""),
    effects: z.array(EFFECT_ENTRY_SCHEMA).min(1),
  })
  .strict()

type ParsedEntry = z.infer<typeof EFFECT_ENTRY_SCHEMA>

interface ParsedDebuffMajor {
  debuffId: string
  name: string
  description: string
  effects: readonly ParsedEntry[]
}

function parseDebuffMajor(row: Page): ParsedDebuffMajor {
  if (row.title === null) {
    throw new Error(`temper-debuff-major row ${row.id} has null title`)
  }
  const eav = DEBUFF_MAJOR_EAV_SCHEMA.parse({
    debuffId: row.debuffId,
    description: row.description,
    effects: row.effects,
  })
  return {
    debuffId: eav.debuffId,
    name: row.title,
    description: eav.description,
    effects: eav.effects,
  }
}

function renderDebuff(debuff: ParsedDebuffMajor): string {
  const idLit = JSON.stringify(debuff.debuffId)
  const entries = debuff.effects.map(renderBuffEffectEntry).join(",\n")
  return `  ${idLit}: {
    id: ${idLit} as const,
    name: ${JSON.stringify(debuff.name)},
    description: ${JSON.stringify(debuff.description)},
    categoryId: "debuffs" as const,
    subcategoryId: "major" as const,
    effects: [
${entries},
    ],
  },`
}

export function generateTemperDebuffMajor(rows: readonly Page[]): string {
  const debuffs = rows.map(parseDebuffMajor)

  const sorted = [...debuffs].sort((a, b) => a.debuffId.localeCompare(b.debuffId))

  const lines = sorted.map(renderDebuff)

  return `\
/**
 * Temper Major Debuffs (Generated)
 *
 * ESO Major debuff data sourced from the universal pages table (page
 * type: temper-debuff-major). 7 entries, one per Major debuff effect.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

interface DebuffMajorEffect {
  metricId: string
  effectType: string
  effectValue: number | { value: number; seconds: number }
}

interface DebuffMajorTemplate {
  id: string
  name: string
  description: string
  categoryId: "debuffs"
  subcategoryId: "major"
  effects: readonly DebuffMajorEffect[]
}

/**
 * Keyed record of Major debuff templates. The literal-id keys flow into
 * \`createDataFile\`'s \`debuffsMajor.ids\` so \`(typeof debuffsMajor.ids)[number]\`
 * stays literal-union typed for downstream consumers.
 */
export const TEMPER_DEBUFF_MAJOR_DATA = {
${lines.join("\n")}
} satisfies Record<string, DebuffMajorTemplate>
`
}
