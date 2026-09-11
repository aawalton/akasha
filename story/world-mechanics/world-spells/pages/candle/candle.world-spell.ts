import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const candle = {
  id: "01a06572-95b8-79ba-879d-a13449788226",
  type: "world-spell",
  slug: "candle",
  title: "Candle",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
