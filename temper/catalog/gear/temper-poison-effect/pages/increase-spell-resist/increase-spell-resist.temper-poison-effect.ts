import type { TemperPoisonEffect } from "akasha/temper/catalog/gear/temper-poison-effect/temper-poison-effect.page-type.types.ts"

export const increaseSpellResist = {
  id: "019e21f7-0f63-77a6-86c5-d670efaa9f65",
  type: "page-type/temper-poison-effect",
  slug: "increase-spell-resist",
  title: "Increase Spell Resistance",
  key: "increase-spell-resist",
  opposite: "temper-poison-effect/breach",
  cooldown: 10,
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
