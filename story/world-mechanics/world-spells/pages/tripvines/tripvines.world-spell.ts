import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const tripvines = {
  id: "01a06572-95e7-703b-b084-78b5312d4f80",
  type: "world-spell",
  slug: "tripvines",
  title: "Tripvines",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
