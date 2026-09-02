import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const maim = {
  id: "01a05fd8-a43c-7974-b378-aaf893abd7f5",
  pageTypeSlug: "temper-poison-effect",
  slug: "maim",
  title: "Maim",
  key: "maim",
  icon: "resources/crafting_alchemy_trait_lowerweaponpower.png",
  isPositive: false,
  oppositeId: "increase-weapon-power",
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
