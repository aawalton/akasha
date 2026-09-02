import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const increaseArmor = {
  id: "01a05fd8-a43a-7be7-b629-94b3938d1b7b",
  pageTypeSlug: "temper-poison-effect",
  slug: "increase-armor",
  title: "Increase Physical Resistance",
  key: "increase-armor",
  icon: "resources/crafting_alchemy_trait_increasearmor.png",
  isPositive: true,
  oppositeId: "fracture",
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
