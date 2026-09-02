import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const METRIC_EFFECT_SCHEMA = z
  .object({
    metricId: z.string(),
    effectType: z.literal("number-per-seconds"),
    effectValue: z
      .object({
        value: z.number(),
        seconds: z.number(),
      })
      .strict(),
  })
  .strict()

const BUFF_EFFECT_SCHEMA = z
  .object({
    buffId: z.string(),
    seconds: z.number(),
  })
  .strict()

const EFFECT_SCHEMA = z.union([METRIC_EFFECT_SCHEMA, BUFF_EFFECT_SCHEMA])

const POTION_EAV_SCHEMA = z
  .object({
    key: z.string(),
    displayOrder: z.number().int().nonnegative(),
    itemId: z.number().int().nonnegative(),
    seconds: z.number().nonnegative(),
    level: z.string(),
    description: z.string(),
    effects: z.array(EFFECT_SCHEMA),
  })
  .strict()

interface ParsedDroppedPotion {
  key: string
  displayOrder: number
  name: string
  itemId: number
  icon: string
  seconds: number
  level: string
  description: string
  effects: readonly z.infer<typeof EFFECT_SCHEMA>[]
}

function parseDroppedPotion(row: Page): ParsedDroppedPotion {
  if (row.title === null) {
    throw new Error(`temper-potion-dropped row ${row.id} has null title`)
  }
  if (typeof row.icon !== "string") {
    throw new Error(`temper-potion-dropped row ${row.id} has non-string icon`)
  }
  const eav = POTION_EAV_SCHEMA.parse({
    key: row.key,
    displayOrder: row.displayOrder,
    itemId: row.itemId,
    seconds: row.seconds,
    level: row.level,
    description: row.description,
    effects: row.effects,
  })
  return {
    key: eav.key,
    displayOrder: eav.displayOrder,
    name: row.title,
    itemId: eav.itemId,
    icon: row.icon,
    seconds: eav.seconds,
    level: eav.level,
    description: eav.description,
    effects: eav.effects,
  }
}

function renderEffect(effect: z.infer<typeof EFFECT_SCHEMA>): string {
  if ("buffId" in effect) {
    return `      { buffId: ${JSON.stringify(effect.buffId)}, seconds: ${effect.seconds} },`
  }
  return `      {
        metricId: ${JSON.stringify(effect.metricId)} as const,
        effectType: ${JSON.stringify(effect.effectType)} as const,
        effectValue: { value: ${effect.effectValue.value}, seconds: ${effect.effectValue.seconds} },
      },`
}

export function generateTemperPotionDropped(rows: readonly Page[]): string {
  const potions = rows.map(parseDroppedPotion)

  const sortedPotions = [...potions].sort((a, b) => a.displayOrder - b.displayOrder)

  const potionEntries = sortedPotions.map((p) => {
    const effectLines = p.effects.map(renderEffect).join("\n")
    return `\
  ${JSON.stringify(p.key)}: {
    id: ${JSON.stringify(p.key)} as const,
    name: ${JSON.stringify(p.name)},
    itemId: ${p.itemId},
    icon: ${JSON.stringify(p.icon)},
    seconds: ${p.seconds},
    level: ${JSON.stringify(p.level)},
    categoryId: "potions" as const,
    subcategoryId: "dropped" as const,
    description: ${JSON.stringify(p.description)},
    effects: [
${effectLines}
    ],
  },`
  })

  return `\
/**
 * Temper Dropped Potions (Generated)
 *
 * ESO world-drop potions, sourced from the universal pages table
 * (page type: temper-potion-dropped).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { PotionsTemplate } from "../potions-source"

export const POTIONS_DROPPED = {
${potionEntries.join("\n")}
} satisfies Record<string, PotionsTemplate>
`
}
