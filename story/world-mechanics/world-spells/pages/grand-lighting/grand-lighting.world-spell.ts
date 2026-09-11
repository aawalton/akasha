import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const grandLighting = {
  id: "01a06572-95c6-707d-a1a8-b9f525d42d49",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "grand-lighting",
  title: "Grand Lighting",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
