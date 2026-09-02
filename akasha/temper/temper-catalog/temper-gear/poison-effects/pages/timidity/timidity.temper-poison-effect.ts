import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const timidity = {
  id: "01a05fd8-a43f-7d5f-8e98-16421ca1a7a2",
  pageTypeSlug: "temper-poison-effect",
  slug: "timidity",
  title: "Timidity",
  key: "timidity",
  icon: "resources/crafting_alchemy_trait_timidity.png",
  isPositive: false,
  oppositeId: "heroism",
  debuffs: "jsonl",
} as const satisfies TemperPoisonEffect
