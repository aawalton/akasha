import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const increaseWeaponPower = {
  id: "01a05fd8-a43c-7b48-920e-b6e30ee4aaf0",
  pageTypeSlug: "temper-poison-effect",
  slug: "increase-weapon-power",
  title: "Increase Weapon Power",
  key: "increase-weapon-power",
  icon: "resources/crafting_alchemy_trait_increaseweaponpower.png",
  isPositive: true,
  oppositeId: "maim",
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
