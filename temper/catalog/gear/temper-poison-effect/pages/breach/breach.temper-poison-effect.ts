import type { TemperPoisonEffect } from "akasha/temper/catalog/gear/temper-poison-effect/temper-poison-effect.page-type.types.ts"

export const breach = {
  id: "019e21f7-0f65-7044-803f-14e745539203",
  type: "page-type/temper-poison-effect",
  slug: "breach",
  title: "Breach",
  key: "breach",
  icon: "resources/crafting_alchemy_trait_lowerspellresist.png",
  isPositive: false,
  opposite: "temper-poison-effect/increase-spell-resist",
  effects: "jsonl",
  createdAt: "2026-05-13T15:31:40.005Z",
  updatedAt: "2026-09-22T13:23:56.000Z",
} as const satisfies TemperPoisonEffect
