import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const banditKing = {
  id: "01a0657e-01af-70a0-836c-a8212d40d10c",
  type: "page-type/world-class",
  slug: "bandit-king",
  title: "Bandit King",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
