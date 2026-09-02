import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const NUMERIC_EFFECT_SCHEMA = z
  .object({
    metricId: z.string(),
    effectType: z.string(),
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

const POTION_EFFECT_SCHEMA = z.union([NUMERIC_EFFECT_SCHEMA, BUFF_EFFECT_SCHEMA])

const POTION_CROWN_EAV_SCHEMA = z
  .object({
    stringId: z.string(),
    itemId: z.number().int().nonnegative(),
    iconPath: z.string(),
    seconds: z.number().nonnegative(),
    level: z.string(),
    categoryId: z.literal("potions"),
    subcategoryId: z.literal("crown"),
    description: z.string(),
    effects: z.array(POTION_EFFECT_SCHEMA),
    displayOrder: z.number().int().nonnegative(),
  })
  .strict()

type ParsedEffect = z.infer<typeof POTION_EFFECT_SCHEMA>

interface ParsedCrownPotion {
  stringId: string
  name: string
  itemId: number
  iconPath: string
  seconds: number
  level: string
  description: string
  effects: readonly ParsedEffect[]
  displayOrder: number
}

function parseCrownPotion(row: Page): ParsedCrownPotion {
  if (row.title === null) {
    throw new Error(`temper-potion-crown row ${row.id} has null title`)
  }
  const eav = POTION_CROWN_EAV_SCHEMA.parse({
    stringId: row.stringId,
    itemId: row.itemId,
    iconPath: row.iconPath,
    seconds: row.seconds,
    level: row.level,
    categoryId: row.categoryId,
    subcategoryId: row.subcategoryId,
    description: row.description,
    effects: row.effects,
    displayOrder: row.displayOrder,
  })
  return {
    stringId: eav.stringId,
    name: row.title,
    itemId: eav.itemId,
    iconPath: eav.iconPath,
    seconds: eav.seconds,
    level: eav.level,
    description: eav.description,
    effects: eav.effects,
    displayOrder: eav.displayOrder,
  }
}

function formatEffect(e: ParsedEffect): string {
  if ("buffId" in e) {
    return `      { buffId: ${JSON.stringify(e.buffId)}, seconds: ${e.seconds} },`
  }
  return `      {
        metricId: ${JSON.stringify(e.metricId)},
        effectType: ${JSON.stringify(e.effectType)},
        effectValue: { value: ${e.effectValue.value}, seconds: ${e.effectValue.seconds} },
      },`
}

export function generateTemperPotionCrown(rows: readonly Page[]): string {
  const potions = rows.map(parseCrownPotion)

  const sorted = [...potions].sort((a, b) => a.displayOrder - b.displayOrder)

  const entries = sorted.map((p) => {
    const effectLines = p.effects.map(formatEffect).join("\n")
    return `\
  ${JSON.stringify(p.stringId)}: {
    id: ${JSON.stringify(p.stringId)} as const,
    name: ${JSON.stringify(p.name)},
    itemId: ${p.itemId},
    icon: ${JSON.stringify(p.iconPath)},
    seconds: ${p.seconds},
    level: ${JSON.stringify(p.level)},
    categoryId: "potions" as const,
    subcategoryId: "crown" as const,
    description: ${JSON.stringify(p.description)},
    effects: [
${effectLines}
    ],
  },`
  })

  return `\
/**
 * Temper Crown-Store Potions (Generated)
 *
 * Crown-store potions sourced from the universal pages table (page type:
 * temper-potion-crown). Shape mirrors the legacy POTIONS_CROWN record so
 * the alchemy package can spread it into the combined POTIONS map.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { PotionsTemplate } from "../potions-source"

export const POTIONS_CROWN = {
${entries.join("\n")}
} satisfies Record<string, PotionsTemplate>
`
}
