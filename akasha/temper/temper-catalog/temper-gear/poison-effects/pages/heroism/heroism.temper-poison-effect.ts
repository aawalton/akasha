import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const heroism = {
  id: "01a05fd8-a43a-7bd8-9f64-60d9cf380aad",
  pageTypeSlug: "temper-poison-effect",
  slug: "heroism",
  title: "Heroism",
  key: "heroism",
  icon: "resources/crafting_alchemy_trait_heroism.png",
  isPositive: true,
  oppositeId: "timidity",
  buffs: "jsonl",
} as const satisfies TemperPoisonEffect
