import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const loudness = {
  id: "01a06572-95d0-7163-86b6-e251f88300f6",
  type: "page-type/world-spell",
  slug: "loudness",
  title: "Loudness",
  world: "world/the-wandering-inn",
  appearanceCount: 5,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.408Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
