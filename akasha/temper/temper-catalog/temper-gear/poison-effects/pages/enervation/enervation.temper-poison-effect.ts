import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const enervation = {
  id: "01a05fd8-a439-7bff-81fe-78a1b1d65b21",
  pageTypeSlug: "temper-poison-effect",
  slug: "enervation",
  title: "Enervation",
  key: "enervation",
  icon: "resources/crafting_alchemy_trait_lowerweaponcrit.png",
  isPositive: false,
  oppositeId: "increase-weapon-crit",
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
