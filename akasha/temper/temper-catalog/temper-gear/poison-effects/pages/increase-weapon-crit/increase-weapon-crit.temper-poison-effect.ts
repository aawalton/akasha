import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const increaseWeaponCrit = {
  id: "01a05fd8-a43b-7b01-aeff-86251e87538b",
  pageTypeSlug: "temper-poison-effect",
  slug: "increase-weapon-crit",
  title: "Increase Weapon Crit",
  key: "increase-weapon-crit",
  icon: "resources/crafting_alchemy_trait_weaponcrit.png",
  isPositive: true,
  oppositeId: "enervation",
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
