import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const fracture = {
  id: "01a05fd8-a439-7130-be8b-5f7be8a02d8e",
  pageTypeSlug: "temper-poison-effect",
  slug: "fracture",
  title: "Fracture",
  key: "fracture",
  icon: "resources/crafting_alchemy_trait_lowerarmor.png",
  isPositive: false,
  oppositeId: "increase-armor",
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
