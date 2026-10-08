import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const shapeEarth = {
  id: "01a06572-95df-7494-a6fa-40af0f8ead41",
  type: "page-type/world-spell",
  slug: "shape-earth",
  title: "Shape Earth",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.423Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
