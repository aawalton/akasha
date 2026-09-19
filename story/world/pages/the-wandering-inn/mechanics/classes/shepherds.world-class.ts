import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const shepherds = {
  id: "01a06586-0a3a-7217-b946-c7d5d000421f",
  type: "page-type/world-class",
  slug: "shepherds",
  title: "Shepherds",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
