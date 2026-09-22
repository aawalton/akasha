import type { TemperPoisonEffect } from "akasha/temper/catalog/gear/temper-poison-effect/temper-poison-effect.page-type.types.ts"

export const spellCritical = {
  id: "019e21f7-0f6e-7a42-931c-f0a5f1850ed0",
  type: "page-type/temper-poison-effect",
  slug: "spell-critical",
  title: "Spell Critical",
  key: "spell-critical",
  icon: "resources/crafting_alchemy_trait_spellcrit.png",
  isPositive: true,
  opposite: "uncertainty",
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
