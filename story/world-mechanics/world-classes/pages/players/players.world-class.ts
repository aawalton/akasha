import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const players = {
  id: "01a06586-0a0a-7325-a454-d9c6a7dd80d4",
  type: "world-class",
  slug: "players",
  title: "Players",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
