import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const vitality = {
  id: "01a05fd8-a440-795b-9d48-bb0c2ebbf6f0",
  pageTypeSlug: "temper-poison-effect",
  slug: "vitality",
  title: "Vitality",
  key: "vitality",
  icon: "resources/crafting_poison_trait_increasehealing.png",
  isPositive: true,
  oppositeId: "defile",
  buffs: "jsonl",
} as const satisfies TemperPoisonEffect
