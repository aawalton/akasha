import type { TemperPoisonEffect } from "akasha/temper/catalog/gear/temper-poison-effect/temper-poison-effect.page-type.types.ts"

export const spellCritical = {
  id: "019e21f7-0f6e-7a42-931c-f0a5f1850ed0",
  type: "page-type/temper-poison-effect",
  slug: "spell-critical",
  title: "Spell Critical",
  key: "spell-critical",
  icon: "resources/crafting_alchemy_trait_spellcrit.png",
  isPositive: true,
  opposite: "temper-poison-effect/uncertainty",
  effects: "jsonl",
  createdAt: "2026-05-13T15:31:40.014Z",
  updatedAt: "2026-09-22T13:23:56.000Z",
} as const satisfies TemperPoisonEffect
