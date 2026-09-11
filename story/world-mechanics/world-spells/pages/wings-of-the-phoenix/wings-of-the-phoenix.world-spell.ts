import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const wingsOfThePhoenix = {
  id: "01a06572-95ea-7e77-a254-19520a29a6a3",
  type: "world-spell",
  slug: "wings-of-the-phoenix",
  title: "Wings of the Phoenix",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
