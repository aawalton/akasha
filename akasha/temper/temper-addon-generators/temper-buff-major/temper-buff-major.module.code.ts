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

const BUFF_MAJOR_EAV_SCHEMA = z
  .object({
    buffId: z.string().min(1),
    description: z.string().default(""),
    effects: z.array(EFFECT_ENTRY_SCHEMA).min(1),
  })
  .strict()

type ParsedEntry = z.infer<typeof EFFECT_ENTRY_SCHEMA>

interface ParsedBuffMajor {
  buffId: string
  name: string
  description: string
  effects: readonly ParsedEntry[]
}

function parseBuffMajor(row: Page): ParsedBuffMajor {
  if (row.title === null) {
    throw new Error(`temper-buff-major row ${row.id} has null title`)
  }
  const eav = BUFF_MAJOR_EAV_SCHEMA.parse({
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

function renderBuff(buff: ParsedBuffMajor): string {
  const idLit = JSON.stringify(buff.buffId)
  const entries = buff.effects.map(renderBuffEffectEntry).join(",\n")
  return `  ${idLit}: {
    id: ${idLit} as const,
    name: ${JSON.stringify(buff.name)},
    description: ${JSON.stringify(buff.description)},
    categoryId: "buffs" as const,
    subcategoryId: "major" as const,
    effects: [
${entries},
    ],
  },`
}

export function generateTemperBuffMajor(rows: readonly Page[]): string {
  const buffs = rows.map(parseBuffMajor)

  const sorted = [...buffs].sort((a, b) => a.buffId.localeCompare(b.buffId))

  const lines = sorted.map(renderBuff)

  return `\
/**
 * Temper Major Buffs (Generated)
 *
 * ESO Major buff data sourced from the universal pages table (page
 * type: temper-buff-major). 20 entries, one per Major buff effect.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

interface BuffMajorEffect {
  metricId: string
  effectType: string
  effectValue: number | { value: number; seconds: number }
}

interface BuffMajorTemplate {
  id: string
  name: string
  description: string
  categoryId: "buffs"
  subcategoryId: "major"
  effects: readonly BuffMajorEffect[]
}

/**
 * Keyed record of Major buff templates. The literal-id keys flow into
 * \`createDataFile\`'s \`buffsMajor.ids\` so \`(typeof buffsMajor.ids)[number]\`
 * stays literal-union typed for downstream consumers.
 */
export const TEMPER_BUFF_MAJOR_DATA = {
${lines.join("\n")}
} satisfies Record<string, BuffMajorTemplate>
`
}
