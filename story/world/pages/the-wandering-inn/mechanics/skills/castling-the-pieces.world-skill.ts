import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const castlingThePieces = {
  id: "01a06575-97fa-7759-8a62-5981958bf573",
  type: "page-type/world-skill",
  slug: "castling-the-pieces",
  title: "Castling the Pieces",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.570Z",
  updatedAt: "2026-09-22T13:31:48.000Z",
} as const satisfies WorldSkill
