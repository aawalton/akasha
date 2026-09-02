import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const speed = {
  id: "01a05fd8-a43f-784b-a270-008973ab8f80",
  pageTypeSlug: "temper-poison-effect",
  slug: "speed",
  title: "Speed",
  key: "speed",
  icon: "resources/crafting_alchemy_trait_speed.png",
  isPositive: true,
  oppositeId: "hindrance",
  buffs: "jsonl",
} as const satisfies TemperPoisonEffect
