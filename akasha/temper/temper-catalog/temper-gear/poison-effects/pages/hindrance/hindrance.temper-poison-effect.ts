import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const hindrance = {
  id: "01a05fd8-a43a-7f6c-9852-7b2637bafbce",
  pageTypeSlug: "temper-poison-effect",
  slug: "hindrance",
  title: "Hindrance",
  key: "hindrance",
  icon: "resources/crafting_alchemy_trait_reducespeed.png",
  isPositive: false,
  oppositeId: "speed",
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
