import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const protection = {
  id: "019e21f7-0f78-7519-8606-007c7e60fcce",
  pageTypeSlug: "temper-poison-effect",
  slug: "protection",
  title: "Protection",
  key: "protection",
  icon: "resources/crafting_poison_trait_protection.png",
  isPositive: true,
  oppositeId: "vulnerability",
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
