import type { TemperPoisonEffect } from "akasha/temper/catalog/gear/temper-poison-effect/temper-poison-effect.page-type.types.ts"

export const increaseWeaponPower = {
  id: "019e21f7-0f6c-77a9-a08d-1a513e9fdac0",
  type: "page-type/temper-poison-effect",
  slug: "increase-weapon-power",
  title: "Increase Weapon Power",
  key: "increase-weapon-power",
  icon: "resources/crafting_alchemy_trait_increaseweaponpower.png",
  isPositive: true,
  opposite: "temper-poison-effect/maim",
  effects: "jsonl",
  createdAt: "2026-05-13T15:31:40.012Z",
  updatedAt: "2026-09-22T13:23:56.000Z",
} as const satisfies TemperPoisonEffect
