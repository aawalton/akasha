import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const increaseSpellPower = {
  id: "01a05fd8-a43b-7859-9a1e-9adde99e5ac6",
  pageTypeSlug: "temper-poison-effect",
  slug: "increase-spell-power",
  title: "Increase Spell Power",
  key: "increase-spell-power",
  icon: "resources/crafting_alchemy_trait_increasespellpower.png",
  isPositive: true,
  oppositeId: "cowardice",
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
