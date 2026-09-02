import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const NUMBER_PER_SECONDS_VALUE = z.object({ value: z.number(), seconds: z.number() }).strict()

const METRIC_EFFECT_SCHEMA = z.union([
  z
    .object({
      metricId: z.string(),
      effectType: z.literal("number-per-seconds"),
      effectValue: NUMBER_PER_SECONDS_VALUE,
    })
    .strict(),
  z
    .object({
      metricId: z.string(),
      effectType: z.literal("number-for-seconds"),
      effectValue: NUMBER_PER_SECONDS_VALUE,
    })
    .strict(),
])

const BUFF_OR_DEBUFF_EFFECT_SCHEMA = z.union([
  z.object({ buffId: z.string(), seconds: z.number().optional() }).strict(),
  z.object({ debuffId: z.string(), seconds: z.number().optional() }).strict(),
])

const POTION_EFFECT_SCHEMA = z.union([METRIC_EFFECT_SCHEMA, BUFF_OR_DEBUFF_EFFECT_SCHEMA])

const REAGENT_NAMES_SCHEMA = z.array(z.array(z.string()).length(3))

const POTION_EAV_SCHEMA = z
  .object({
    key: z.string(),
    description: z.string(),
    icon: z.string(),
    level: z.string(),
    seconds: z.number(),
    reagents: REAGENT_NAMES_SCHEMA,
    effects: z.array(POTION_EFFECT_SCHEMA),
  })
  .strict()

interface ParsedPotion {
  key: string
  name: string
  description: string
  icon: string
  level: string
  seconds: number
  reagents: readonly (readonly string[])[]
  effects: readonly z.infer<typeof POTION_EFFECT_SCHEMA>[]
}

function parsePotion(row: Page): ParsedPotion {
  if (row.title === null) {
    throw new Error(`temper-potion-crafted row ${row.id} has null title`)
  }
  const eav = POTION_EAV_SCHEMA.parse({
    key: row.key,
    description: row.description,
    icon: row.icon,
    level: row.level,
    seconds: row.seconds,
    reagents: row.reagents,
    effects: row.effects,
  })
  return {
    key: eav.key,
    name: row.title,
    description: eav.description,
    icon: eav.icon,
    level: eav.level,
    seconds: eav.seconds,
    reagents: eav.reagents,
    effects: eav.effects,
  }
}

function formatEffect(effect: z.infer<typeof POTION_EFFECT_SCHEMA>): string {
  return JSON.stringify(effect)
}

function formatReagents(reagents: readonly (readonly string[])[]): string {
  return `[${reagents.map((combo) => `[${combo.map((r) => JSON.stringify(r)).join(", ")}]`).join(", ")}]`
}

function formatPotionEntry(potion: ParsedPotion): string {
  const effectLines = potion.effects.map((e) => `      ${formatEffect(e)},`).join("\n")
  return `\
  ${JSON.stringify(potion.key)}: {
    id: ${JSON.stringify(potion.key)} as const,
    name: ${JSON.stringify(potion.name)},
    description: ${JSON.stringify(potion.description)},
    categoryId: "potions" as const,
    subcategoryId: "crafted" as const,
    itemId: 0,
    icon: ${JSON.stringify(potion.icon)},
    level: ${JSON.stringify(potion.level)},
    seconds: ${potion.seconds},
    reagents: ${formatReagents(potion.reagents)},
    effects: [
${effectLines}
    ],
  },`
}

export function generateTemperPotionCrafted(potionRows: readonly Page[]): string {
  const potions = potionRows.map(parsePotion)

  const entries = potions.map(formatPotionEntry).join("\n\n")

  return `\
/**
 * Temper Crafted Potions (Generated)
 *
 * Crafted alchemy potions sourced from the universal pages table (page
 * type: temper-potion-crafted).
 *
 * DO NOT EDIT - regenerate with: ops temper addon-data generate
 */

import type { PotionsTemplate } from "../potions-source"

export const POTIONS_CRAFTED = {
${entries}
} satisfies Record<string, PotionsTemplate>
`
}
