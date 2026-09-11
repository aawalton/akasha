import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const acidArrow = {
  id: "01a06572-95b3-779f-8cc8-9c973861d20e",
  type: "world-spell",
  slug: "acid-arrow",
  title: "Acid Arrow",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
