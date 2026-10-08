import type { TemperPoisonEffect } from "akasha/temper/catalog/gear/temper-poison-effect/temper-poison-effect.page-type.types.ts"

export const uncertainty = {
  id: "019e21f7-0f6f-7ad0-85d3-ac6bbe655d81",
  type: "page-type/temper-poison-effect",
  slug: "uncertainty",
  title: "Uncertainty",
  key: "uncertainty",
  icon: "resources/crafting_alchemy_trait_lowerspellcrit.png",
  isPositive: false,
  opposite: "temper-poison-effect/spell-critical",
  effects: "jsonl",
  createdAt: "2026-05-13T15:31:40.015Z",
  updatedAt: "2026-09-22T13:23:56.000Z",
} as const satisfies TemperPoisonEffect
