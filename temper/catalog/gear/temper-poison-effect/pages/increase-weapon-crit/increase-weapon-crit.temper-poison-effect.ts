import type { TemperPoisonEffect } from "akasha/temper/catalog/gear/temper-poison-effect/temper-poison-effect.page-type.types.ts"

export const increaseWeaponCrit = {
  id: "019e21f7-0f70-7d08-ad68-57e21591647b",
  type: "page-type/temper-poison-effect",
  slug: "increase-weapon-crit",
  title: "Increase Weapon Crit",
  key: "increase-weapon-crit",
  icon: "resources/crafting_alchemy_trait_weaponcrit.png",
  isPositive: true,
  opposite: "temper-poison-effect/enervation",
  effects: "jsonl",
  createdAt: "2026-05-13T15:31:40.016Z",
  updatedAt: "2026-09-22T13:23:56.000Z",
} as const satisfies TemperPoisonEffect
