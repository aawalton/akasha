import type { TemperPoisonEffect } from "akasha/temper/catalog/gear/temper-poison-effect/temper-poison-effect.page-type.types.ts"

export const gradualRavageHealth = {
  id: "019e21f7-0f7a-7bb5-9a91-de88e791f918",
  type: "page-type/temper-poison-effect",
  slug: "gradual-ravage-health",
  title: "Gradual Ravage Health",
  key: "gradual-ravage-health",
  icon: "resources/crafting_poison_trait_dot.png",
  isPositive: false,
  opposite: "temper-poison-effect/lingering-health",
  effects: "jsonl",
  createdAt: "2026-05-13T15:31:40.026Z",
  updatedAt: "2026-09-22T13:23:56.000Z",
} as const satisfies TemperPoisonEffect
