import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const wallOfEarth = {
  id: "01a06572-95e8-77b3-8b8b-e4ad8db5f03f",
  type: "page-type/world-spell",
  slug: "wall-of-earth",
  title: "Wall of Earth",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.432Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
