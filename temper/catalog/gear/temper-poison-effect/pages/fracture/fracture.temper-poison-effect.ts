import type { TemperPoisonEffect } from "akasha/temper/catalog/gear/temper-poison-effect/temper-poison-effect.page-type.types.ts"

export const fracture = {
  id: "019e21f7-0f68-75f6-9e3d-fc3dc0eeaa27",
  type: "page-type/temper-poison-effect",
  slug: "fracture",
  title: "Fracture",
  key: "fracture",
  icon: "resources/crafting_alchemy_trait_lowerarmor.png",
  isPositive: false,
  opposite: "increase-armor",
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
