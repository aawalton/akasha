import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const uncertainty = {
  id: "01a05fd8-a43f-759d-9dd9-feb140a1662a",
  pageTypeSlug: "temper-poison-effect",
  slug: "uncertainty",
  title: "Uncertainty",
  key: "uncertainty",
  icon: "resources/crafting_alchemy_trait_lowerspellcrit.png",
  isPositive: false,
  oppositeId: "spell-critical",
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
