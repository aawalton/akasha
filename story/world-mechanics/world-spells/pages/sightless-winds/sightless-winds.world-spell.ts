import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const sightlessWinds = {
  id: "01a06572-95e0-7d43-a8c0-584d0cdbf331",
  type: "world-spell",
  slug: "sightless-winds",
  title: "Sightless Winds",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
