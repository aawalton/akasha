import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const loudness = {
  id: "01a06572-95d0-7163-86b6-e251f88300f6",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "loudness",
  title: "Loudness",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
