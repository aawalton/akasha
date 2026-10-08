import type { TemperPoisonEffect } from "akasha/temper/catalog/gear/temper-poison-effect/temper-poison-effect.page-type.types.ts"

export const vitality = {
  id: "019e21f7-0f7b-7a1e-9c4d-3e7027222d9e",
  type: "page-type/temper-poison-effect",
  slug: "vitality",
  title: "Vitality",
  key: "vitality",
  icon: "resources/crafting_poison_trait_increasehealing.png",
  isPositive: true,
  opposite: "temper-poison-effect/defile",
  effects: "jsonl",
  createdAt: "2026-05-13T15:31:40.027Z",
  updatedAt: "2026-09-22T13:23:56.000Z",
} as const satisfies TemperPoisonEffect
