import type { TemperPoisonEffect } from "akasha/temper/catalog/gear/temper-poison-effect/temper-poison-effect.page-type.types.ts"

export const defile = {
  id: "019e21f7-0f7c-7854-a0c1-63580dc90e94",
  type: "page-type/temper-poison-effect",
  slug: "defile",
  title: "Defile",
  key: "defile",
  icon: "resources/crafting_poison_trait_decreasehealing.png",
  isPositive: false,
  opposite: "vitality",
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
