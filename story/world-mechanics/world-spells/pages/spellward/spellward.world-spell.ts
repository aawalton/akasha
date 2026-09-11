import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const spellward = {
  id: "01a06572-95e2-7b54-9974-489a94c6696c",
  type: "world-spell",
  slug: "spellward",
  title: "Spellward",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
