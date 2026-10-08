import type { TemperPoisonEffect } from "akasha/temper/catalog/gear/temper-poison-effect/temper-poison-effect.page-type.types.ts"

export const increaseSpellPower = {
  id: "019e21f7-0f6a-707f-a5ba-ef91f94d2cac",
  type: "page-type/temper-poison-effect",
  slug: "increase-spell-power",
  title: "Increase Spell Power",
  key: "increase-spell-power",
  icon: "resources/crafting_alchemy_trait_increasespellpower.png",
  isPositive: true,
  opposite: "temper-poison-effect/cowardice",
  effects: "jsonl",
  createdAt: "2026-05-13T15:31:40.010Z",
  updatedAt: "2026-09-22T13:23:56.000Z",
} as const satisfies TemperPoisonEffect
