import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const greaterFireResistance = {
  id: "01a06572-95c7-7b2f-916b-4f3ccb3c76f0",
  type: "world-spell",
  slug: "greater-fire-resistance",
  title: "Greater Fire Resistance",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
