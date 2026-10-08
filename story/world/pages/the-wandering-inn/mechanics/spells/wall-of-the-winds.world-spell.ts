import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const wallOfTheWinds = {
  id: "01a06572-95e9-718a-a7a6-d3d62246ce5c",
  type: "page-type/world-spell",
  slug: "wall-of-the-winds",
  title: "Wall of the Winds",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.433Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
