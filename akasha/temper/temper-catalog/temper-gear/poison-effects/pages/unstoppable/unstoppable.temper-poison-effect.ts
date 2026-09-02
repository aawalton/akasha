import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const unstoppable = {
  id: "01a05fd8-a440-72c3-94e6-e07db7b60489",
  pageTypeSlug: "temper-poison-effect",
  slug: "unstoppable",
  title: "Unstoppable",
  key: "unstoppable",
  icon: "resources/crafting_alchemy_trait_unstoppable.png",
  isPositive: true,
  oppositeId: "entrapment",
} as const satisfies TemperPoisonEffect
