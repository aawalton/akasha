import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const entrapment = {
  id: "01a05fd8-a439-765c-9222-2010cd1d12f5",
  pageTypeSlug: "temper-poison-effect",
  slug: "entrapment",
  title: "Entrapment",
  key: "entrapment",
  icon: "resources/crafting_alchemy_trait_stun.png",
  isPositive: false,
  oppositeId: "unstoppable",
} as const satisfies TemperPoisonEffect
