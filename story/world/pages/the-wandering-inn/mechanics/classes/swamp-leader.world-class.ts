import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const swampLeader = {
  id: "01a06586-0a60-719e-86e9-ad8d617d05a0",
  type: "page-type/world-class",
  slug: "swamp-leader",
  title: "Swamp Leader",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
