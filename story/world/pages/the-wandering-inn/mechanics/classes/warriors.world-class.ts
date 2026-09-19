import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const warriors = {
  id: "01a06586-0a75-7616-b8d4-b444e0f80063",
  type: "page-type/world-class",
  slug: "warriors",
  title: "Warriors",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
