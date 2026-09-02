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

const DEBUFF_OTHER_EAV_SCHEMA = z
  .object({
    buffId: z.string().min(1),
    description: z.string().default(""),
    effects: z.array(EFFECT_ENTRY_SCHEMA),
  })
  .strict()

type ParsedEntry = z.infer<typeof EFFECT_ENTRY_SCHEMA>

interface ParsedDebuffOther {
  buffId: string
  name: string
  description: string
  effects: readonly ParsedEntry[]
}

function parseDebuffOther(row: Page): ParsedDebuffOther {
  if (row.title === null) {
    throw new Error(`temper-debuff-other row ${row.id} has null title`)
  }
  const eav = DEBUFF_OTHER_EAV_SCHEMA.parse({
    buffId: row.buffId,
    description: row.description,
    effects: row.effects,
  })
  return {
    buffId: eav.buffId,
    name: row.title,
    description: eav.description,
    effects: eav.effects,
  }
}

function renderDebuff(debuff: ParsedDebuffOther): string {
  const idLit = JSON.stringify(debuff.buffId)
  const entries = debuff.effects.map(renderBuffEffectEntry).join(",\n")
  const effectsBlock =
    debuff.effects.length === 0
      ? `    effects: [],`
      : `    effects: [
${entries},
    ],`
  return `  ${idLit}: {
    id: ${idLit} as const,
    name: ${JSON.stringify(debuff.name)},
    description: ${JSON.stringify(debuff.description)},
    categoryId: "debuffs" as const,
    subcategoryId: "other" as const,
${effectsBlock}
  },`
}

export function generateTemperDebuffOther(rows: readonly Page[]): string {
  const debuffs = rows.map(parseDebuffOther)

  const sorted = [...debuffs].sort((a, b) => a.buffId.localeCompare(b.buffId))

  const lines = sorted.map(renderDebuff)

  return `\
/**
 * Temper Other Debuffs (Generated)
 *
 * ESO Other-category debuff data sourced from the universal pages table
 * (page type: temper-debuff-other). Entries with empty \`effects\` arrays
 * are permitted (e.g. \`stun\`, \`fear\`, \`silence\` are purely
 * crowd-control flags).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

interface DebuffOtherEffect {
  metricId: string
  effectType: string
  effectValue: number | { value: number; seconds: number }
}

interface DebuffOtherTemplate {
  id: string
  name: string
  description: string
  categoryId: "debuffs"
  subcategoryId: "other"
  effects: readonly DebuffOtherEffect[]
}

/**
 * Keyed record of Other-category debuff templates. The literal-id keys flow
 * into \`createDataFile\`'s \`debuffsOther.ids\` so \`(typeof debuffsOther.ids)[number]\`
 * stays literal-union typed for downstream consumers.
 */
export const TEMPER_DEBUFF_OTHER_DATA = {
${lines.join("\n")}
} satisfies Record<string, DebuffOtherTemplate>
`
}
