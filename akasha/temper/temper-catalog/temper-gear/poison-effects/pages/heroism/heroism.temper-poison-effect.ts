import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const heroism = {
  id: "019e21f7-0f7d-7533-82cf-702e548dfd20",
  pageTypeSlug: "temper-poison-effect",
  slug: "heroism",
  title: "Heroism",
  key: "heroism",
  icon: "resources/crafting_alchemy_trait_heroism.png",
  isPositive: true,
  oppositeId: "timidity",
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
