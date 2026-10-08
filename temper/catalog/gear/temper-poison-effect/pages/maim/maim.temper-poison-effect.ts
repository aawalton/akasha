import type { TemperPoisonEffect } from "akasha/temper/catalog/gear/temper-poison-effect/temper-poison-effect.page-type.types.ts"

export const maim = {
  id: "019e21f7-0f6d-794e-abbd-a6ffd39e5ef4",
  type: "page-type/temper-poison-effect",
  slug: "maim",
  title: "Maim",
  key: "maim",
  icon: "resources/crafting_alchemy_trait_lowerweaponpower.png",
  isPositive: false,
  opposite: "temper-poison-effect/increase-weapon-power",
  effects: "jsonl",
  createdAt: "2026-05-13T15:31:40.013Z",
  updatedAt: "2026-09-22T13:23:56.000Z",
} as const satisfies TemperPoisonEffect
