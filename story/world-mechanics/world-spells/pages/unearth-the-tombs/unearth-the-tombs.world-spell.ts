import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const unearthTheTombs = {
  id: "01a06572-95e7-7241-8d82-09c6e025d734",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "unearth-the-tombs",
  title: "Unearth the Tombs",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
