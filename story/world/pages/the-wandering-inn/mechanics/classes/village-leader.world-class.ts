import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const villageLeader = {
  id: "01a06586-0a70-7fb8-8e1b-64ef54bea4e9",
  type: "page-type/world-class",
  slug: "village-leader",
  title: "Village Leader",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
