import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const dragonriders = {
  id: "01a0657e-1356-73d6-87ea-f43f254c491a",
  type: "page-type/world-class",
  slug: "dragonriders",
  title: "Dragonriders",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
