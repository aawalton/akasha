import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const detection = {
  id: "019e21f7-0f75-708c-b36b-42e23e829ddf",
  pageTypeSlug: "temper-poison-effect",
  slug: "detection",
  title: "Detection",
  key: "detection",
  icon: "resources/crafting_alchemy_trait_detection.png",
  isPositive: true,
  oppositeId: "invisible",
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
