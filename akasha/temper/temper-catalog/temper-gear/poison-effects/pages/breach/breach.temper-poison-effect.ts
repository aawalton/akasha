import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const breach = {
  id: "019e21f7-0f65-7044-803f-14e745539203",
  pageTypeSlug: "temper-poison-effect",
  slug: "breach",
  title: "Breach",
  key: "breach",
  icon: "resources/crafting_alchemy_trait_lowerspellresist.png",
  isPositive: false,
  oppositeId: "increase-spell-resist",
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
