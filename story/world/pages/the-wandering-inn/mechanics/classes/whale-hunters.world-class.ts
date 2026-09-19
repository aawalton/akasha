import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const whaleHunters = {
  id: "01a06586-0a76-797a-8859-2590671e66e4",
  type: "page-type/world-class",
  slug: "whale-hunters",
  title: "Whale Hunters",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
