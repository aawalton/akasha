import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const gradualRavageHealth = {
  id: "01a05fd8-a43a-7d44-bd68-951c5467f84d",
  pageTypeSlug: "temper-poison-effect",
  slug: "gradual-ravage-health",
  title: "Gradual Ravage Health",
  key: "gradual-ravage-health",
  icon: "resources/crafting_poison_trait_dot.png",
  isPositive: false,
  oppositeId: "lingering-health",
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
