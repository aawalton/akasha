import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const wallOfBlades = {
  id: "01a06572-95e8-7e12-ae6a-517208d91cfd",
  type: "page-type/world-spell",
  slug: "wall-of-blades",
  title: "Wall of Blades",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.432Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
