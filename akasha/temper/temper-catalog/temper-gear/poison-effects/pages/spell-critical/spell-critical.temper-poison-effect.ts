import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const spellCritical = {
  id: "01a05fd8-a43f-70ae-bd34-aefd2a04e3ca",
  pageTypeSlug: "temper-poison-effect",
  slug: "spell-critical",
  title: "Spell Critical",
  key: "spell-critical",
  icon: "resources/crafting_alchemy_trait_spellcrit.png",
  isPositive: true,
  oppositeId: "uncertainty",
  buffs: "jsonl",
} as const satisfies TemperPoisonEffect
