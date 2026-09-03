import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const vitality = {
  id: "019e21f7-0f7b-7a1e-9c4d-3e7027222d9e",
  pageTypeSlug: "temper-poison-effect",
  slug: "vitality",
  title: "Vitality",
  key: "vitality",
  icon: "resources/crafting_poison_trait_increasehealing.png",
  isPositive: true,
  oppositeId: "defile",
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
