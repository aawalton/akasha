import type { TemperPoisonEffect } from "akasha/temper/catalog/gear/temper-poison-effect/temper-poison-effect.page-type.types.ts"

export const timidity = {
  id: "019e21f7-0f7e-76b2-9990-71d542447533",
  type: "page-type/temper-poison-effect",
  slug: "timidity",
  title: "Timidity",
  key: "timidity",
  icon: "resources/crafting_alchemy_trait_timidity.png",
  isPositive: false,
  opposite: "temper-poison-effect/heroism",
  effects: "jsonl",
  createdAt: "2026-05-13T15:31:40.030Z",
  updatedAt: "2026-09-22T13:23:56.000Z",
} as const satisfies TemperPoisonEffect
