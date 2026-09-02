import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const breach = {
  id: "01a05fd8-a438-7470-a807-4cc4e86d65a1",
  pageTypeSlug: "temper-poison-effect",
  slug: "breach",
  title: "Breach",
  key: "breach",
  icon: "resources/crafting_alchemy_trait_lowerspellresist.png",
  isPositive: false,
  oppositeId: "increase-spell-resist",
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
