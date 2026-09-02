import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const lingeringHealth = {
  id: "01a05fd8-a43c-7430-ac7f-ddfcd0b79951",
  pageTypeSlug: "temper-poison-effect",
  slug: "lingering-health",
  title: "Lingering Health",
  key: "lingering-health",
  icon: "resources/crafting_poison_trait_hot.png",
  isPositive: true,
  oppositeId: "gradual-ravage-health",
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
