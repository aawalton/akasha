import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const cowardice = {
  id: "01a05fd8-a438-799d-ac27-78ff956f45af",
  pageTypeSlug: "temper-poison-effect",
  slug: "cowardice",
  title: "Cowardice",
  key: "cowardice",
  icon: "resources/crafting_alchemy_trait_lowerspellpower.png",
  isPositive: false,
  oppositeId: "increase-spell-power",
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
