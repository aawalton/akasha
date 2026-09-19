import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const royalHealer = {
  id: "01a06586-0a26-7586-9ae3-886a3cf4a5a1",
  type: "page-type/world-class",
  slug: "royal-healer",
  title: "Royal Healer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
