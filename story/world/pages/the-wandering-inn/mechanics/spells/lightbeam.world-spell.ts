import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lightbeam = {
  id: "01a06572-95cf-71d9-81d0-5aae5477cabc",
  type: "page-type/world-spell",
  slug: "lightbeam",
  title: "Lightbeam",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.407Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
