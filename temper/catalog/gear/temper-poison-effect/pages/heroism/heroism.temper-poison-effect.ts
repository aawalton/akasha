import type { TemperPoisonEffect } from "akasha/temper/catalog/gear/temper-poison-effect/temper-poison-effect.page-type.types.ts"

export const heroism = {
  id: "019e21f7-0f7d-7533-82cf-702e548dfd20",
  type: "page-type/temper-poison-effect",
  slug: "heroism",
  title: "Heroism",
  key: "heroism",
  icon: "resources/crafting_alchemy_trait_heroism.png",
  isPositive: true,
  opposite: "temper-poison-effect/timidity",
  effects: "jsonl",
  createdAt: "2026-05-13T15:31:40.029Z",
  updatedAt: "2026-09-22T13:23:56.000Z",
} as const satisfies TemperPoisonEffect
