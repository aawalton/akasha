import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const protection = {
  id: "01a05fd8-a43d-79e2-94ea-cbfb1da41e3c",
  pageTypeSlug: "temper-poison-effect",
  slug: "protection",
  title: "Protection",
  key: "protection",
  icon: "resources/crafting_poison_trait_protection.png",
  isPositive: true,
  oppositeId: "vulnerability",
  buffs: "jsonl",
} as const satisfies TemperPoisonEffect
