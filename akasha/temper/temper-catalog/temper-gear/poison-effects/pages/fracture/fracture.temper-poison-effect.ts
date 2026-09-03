import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const fracture = {
  id: "019e21f7-0f68-75f6-9e3d-fc3dc0eeaa27",
  pageTypeSlug: "temper-poison-effect",
  slug: "fracture",
  title: "Fracture",
  key: "fracture",
  icon: "resources/crafting_alchemy_trait_lowerarmor.png",
  isPositive: false,
  oppositeId: "increase-armor",
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
