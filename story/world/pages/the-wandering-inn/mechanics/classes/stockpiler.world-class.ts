import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const stockpiler = {
  id: "01a06586-0a54-7799-b2ab-37f5d890cae5",
  type: "page-type/world-class",
  slug: "stockpiler",
  title: "Stockpiler",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
