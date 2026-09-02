import type { TemperPoisonEffect } from "../../temper-poison-effect.page-type.ts"

export const increaseSpellResist = {
  id: "01a05fd8-a43b-78ea-9f28-c6175033c26d",
  pageTypeSlug: "temper-poison-effect",
  slug: "increase-spell-resist",
  title: "Increase Spell Resistance",
  key: "increase-spell-resist",
  oppositeId: "breach",
  cooldown: 10,
  effects: "jsonl",
} as const satisfies TemperPoisonEffect
