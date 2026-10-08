import type { TemperPoisonEffect } from "akasha/temper/catalog/gear/temper-poison-effect/temper-poison-effect.page-type.types.ts"

export const defile = {
  id: "019e21f7-0f7c-7854-a0c1-63580dc90e94",
  type: "page-type/temper-poison-effect",
  slug: "defile",
  title: "Defile",
  key: "defile",
  icon: "resources/crafting_poison_trait_decreasehealing.png",
  isPositive: false,
  opposite: "temper-poison-effect/vitality",
  effects: "jsonl",
  createdAt: "2026-05-13T15:31:40.028Z",
  updatedAt: "2026-09-22T13:23:56.000Z",
} as const satisfies TemperPoisonEffect
