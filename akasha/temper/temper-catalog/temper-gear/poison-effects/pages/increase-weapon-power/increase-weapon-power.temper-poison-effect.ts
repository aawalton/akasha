import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const increaseWeaponPower = {
  id: "019e21f7-0f6c-77a9-a08d-1a513e9fdac0",
  pageTypeSlug: "temper-poison-effect",
  slug: "increase-weapon-power",
  title: "Increase Weapon Power",
  key: "increase-weapon-power",
  icon: "resources/crafting_alchemy_trait_increaseweaponpower.png",
  isPositive: true,
  oppositeId: "maim",
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
