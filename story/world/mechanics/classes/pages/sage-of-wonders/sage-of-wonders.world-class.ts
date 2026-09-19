import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const sageOfWonders = {
  id: "01a06586-0a28-7610-93d7-ecf51a8062ac",
  type: "page-type/world-class",
  slug: "sage-of-wonders",
  title: "Sage of Wonders",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
