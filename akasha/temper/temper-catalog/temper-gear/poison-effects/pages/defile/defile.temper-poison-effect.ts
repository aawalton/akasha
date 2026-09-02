import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const defile = {
  id: "01a05fd8-a438-7aab-8a7e-16d39c7eaa3f",
  pageTypeSlug: "temper-poison-effect",
  slug: "defile",
  title: "Defile",
  key: "defile",
  icon: "resources/crafting_poison_trait_decreasehealing.png",
  isPositive: false,
  oppositeId: "vitality",
  debuffs: "jsonl",
} as const satisfies TemperPoisonEffect
