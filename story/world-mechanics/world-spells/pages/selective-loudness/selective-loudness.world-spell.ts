import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const selectiveLoudness = {
  id: "01a06572-95df-7217-b1fd-e4d6fcb70d96",
  type: "world-spell",
  slug: "selective-loudness",
  title: "Selective Loudness",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
