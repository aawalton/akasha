import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const detection = {
  id: "01a05fd8-a439-77bc-b23a-60da10059110",
  pageTypeSlug: "temper-poison-effect",
  slug: "detection",
  title: "Detection",
  key: "detection",
  icon: "resources/crafting_alchemy_trait_detection.png",
  isPositive: true,
  oppositeId: "invisible",
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
