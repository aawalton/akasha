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
  createdAt: "2026-05-13T15:31:40.024Z",
  updatedAt: "2026-09-22T13:23:56.000Z",
} as const satisfies TemperPoisonEffect
