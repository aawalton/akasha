import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const invisible = {
  id: "01a05fd8-a43c-7a3b-ba1e-aaf093f79c91",
  pageTypeSlug: "temper-poison-effect",
  slug: "invisible",
  title: "Invisible",
  key: "invisible",
  icon: "resources/crafting_alchemy_trait_invisible.png",
  isPositive: true,
  oppositeId: "detection",
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
