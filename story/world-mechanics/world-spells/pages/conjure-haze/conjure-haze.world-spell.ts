import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const conjureHaze = {
  id: "01a06572-95ba-7673-b7dd-eaf017628ab0",
  type: "world-spell",
  slug: "conjure-haze",
  title: "Conjure Haze",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
