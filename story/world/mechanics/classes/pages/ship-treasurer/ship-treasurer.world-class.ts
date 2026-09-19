import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const shipTreasurer = {
  id: "01a06586-0a3b-74b3-895c-312ee8017c44",
  type: "page-type/world-class",
  slug: "ship-treasurer",
  title: "Ship Treasurer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
