import type { TemperPoisonEffect } from "akasha/temper/catalog/gear/temper-poison-effect/temper-poison-effect.page-type.types.ts"

export const enervation = {
  id: "019e21f7-0f71-7de9-89e5-1da9106ccb55",
  type: "page-type/temper-poison-effect",
  slug: "enervation",
  title: "Enervation",
  key: "enervation",
  icon: "resources/crafting_alchemy_trait_lowerweaponcrit.png",
  isPositive: false,
  opposite: "temper-poison-effect/increase-weapon-crit",
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
