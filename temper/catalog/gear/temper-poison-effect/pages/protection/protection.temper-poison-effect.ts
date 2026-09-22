import type { TemperPoisonEffect } from "akasha/temper/catalog/gear/temper-poison-effect/temper-poison-effect.page-type.types.ts"

export const protection = {
  id: "019e21f7-0f78-7519-8606-007c7e60fcce",
  type: "page-type/temper-poison-effect",
  slug: "protection",
  title: "Protection",
  key: "protection",
  icon: "resources/crafting_poison_trait_protection.png",
  isPositive: true,
  opposite: "temper-poison-effect/vulnerability",
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
