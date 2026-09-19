import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const councilor = {
  id: "01a0657e-01ca-7841-abb0-4ff51682c666",
  type: "page-type/world-class",
  slug: "councilor",
  title: "Councilor",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
