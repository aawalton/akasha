import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const speed = {
  id: "019e21f7-0f76-7c03-b681-748d33683851",
  pageTypeSlug: "temper-poison-effect",
  slug: "speed",
  title: "Speed",
  key: "speed",
  icon: "resources/crafting_alchemy_trait_speed.png",
  isPositive: true,
  oppositeId: "hindrance",
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
