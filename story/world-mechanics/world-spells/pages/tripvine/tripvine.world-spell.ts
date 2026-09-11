import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const tripvine = {
  id: "01a06572-95e7-7abb-a144-0a5898d39c62",
  type: "world-spell",
  slug: "tripvine",
  title: "Tripvine",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
