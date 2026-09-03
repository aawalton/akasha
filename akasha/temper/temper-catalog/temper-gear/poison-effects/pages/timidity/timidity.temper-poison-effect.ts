import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const timidity = {
  id: "019e21f7-0f7e-76b2-9990-71d542447533",
  pageTypeSlug: "temper-poison-effect",
  slug: "timidity",
  title: "Timidity",
  key: "timidity",
  icon: "resources/crafting_alchemy_trait_timidity.png",
  isPositive: false,
  oppositeId: "heroism",
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
