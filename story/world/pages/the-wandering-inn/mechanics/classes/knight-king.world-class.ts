import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const knightKing = {
  id: "01a0657e-137c-7502-8b19-cc53497d9f55",
  type: "page-type/world-class",
  slug: "knight-king",
  title: "Knight-King",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
