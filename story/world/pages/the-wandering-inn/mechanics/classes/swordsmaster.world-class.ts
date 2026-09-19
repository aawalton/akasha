import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const swordsmaster = {
  id: "01a06586-0a61-7060-b8c3-458eef6f5d6b",
  type: "page-type/world-class",
  slug: "swordsmaster",
  title: "Swordsmaster",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
