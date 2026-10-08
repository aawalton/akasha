import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const sightlessWinds = {
  id: "01a06572-95e0-7d43-a8c0-584d0cdbf331",
  type: "page-type/world-spell",
  slug: "sightless-winds",
  title: "Sightless Winds",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.424Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
