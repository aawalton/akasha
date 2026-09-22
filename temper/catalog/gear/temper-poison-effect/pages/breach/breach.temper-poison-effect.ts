import type { TemperPoisonEffect } from "akasha/temper/catalog/gear/temper-poison-effect/temper-poison-effect.page-type.types.ts"

export const breach = {
  id: "019e21f7-0f65-7044-803f-14e745539203",
  type: "page-type/temper-poison-effect",
  slug: "breach",
  title: "Breach",
  key: "breach",
  icon: "resources/crafting_alchemy_trait_lowerspellresist.png",
  isPositive: false,
  opposite: "increase-spell-resist",
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
