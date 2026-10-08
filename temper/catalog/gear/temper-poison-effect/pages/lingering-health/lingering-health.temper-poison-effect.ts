import type { TemperPoisonEffect } from "akasha/temper/catalog/gear/temper-poison-effect/temper-poison-effect.page-type.types.ts"

export const lingeringHealth = {
  id: "019e21f7-0f79-7f1e-95b6-9ec56dbfc994",
  type: "page-type/temper-poison-effect",
  slug: "lingering-health",
  title: "Lingering Health",
  key: "lingering-health",
  icon: "resources/crafting_poison_trait_hot.png",
  isPositive: true,
  opposite: "temper-poison-effect/gradual-ravage-health",
  effects: "jsonl",
  createdAt: "2026-05-13T15:31:40.025Z",
  updatedAt: "2026-09-22T13:23:56.000Z",
} as const satisfies TemperPoisonEffect
