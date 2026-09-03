import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const increaseSpellPower = {
  id: "019e21f7-0f6a-707f-a5ba-ef91f94d2cac",
  pageTypeSlug: "temper-poison-effect",
  slug: "increase-spell-power",
  title: "Increase Spell Power",
  key: "increase-spell-power",
  icon: "resources/crafting_alchemy_trait_increasespellpower.png",
  isPositive: true,
  oppositeId: "cowardice",
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
