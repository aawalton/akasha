import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const arrowOfFever = {
  id: "01a06572-95b4-7e46-a82f-9b98534f8d46",
  type: "page-type/world-spell",
  slug: "arrow-of-fever",
  title: "Arrow of Fever",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
