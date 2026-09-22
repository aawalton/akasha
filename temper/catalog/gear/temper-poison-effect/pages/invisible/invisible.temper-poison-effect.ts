import type { TemperPoisonEffect } from "akasha/temper/catalog/gear/temper-poison-effect/temper-poison-effect.page-type.types.ts"

export const invisible = {
  id: "019e21f7-0f75-7ecc-b654-68dde11b0d1e",
  type: "page-type/temper-poison-effect",
  slug: "invisible",
  title: "Invisible",
  key: "invisible",
  icon: "resources/crafting_alchemy_trait_invisible.png",
  isPositive: true,
  opposite: "temper-poison-effect/detection",
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
