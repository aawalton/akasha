import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const waterArrow = {
  id: "01a06572-95e9-7583-bb15-755d7f18237a",
  type: "world-spell",
  slug: "water-arrow",
  title: "Water Arrow",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
