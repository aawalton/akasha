import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const castlingThePieces = {
  id: "01a06575-97fa-7759-8a62-5981958bf573",
  type: "page-type/world-skill",
  slug: "castling-the-pieces",
  title: "Castling the Pieces",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
