import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const titanKing = {
  id: "01a0657e-026c-77e3-9381-a6f8b6ff4f1d",
  type: "page-type/world-class",
  slug: "titan-king",
  title: "Titan King",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
