import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const councilor = {
  id: "01a0657e-01ca-7841-abb0-4ff51682c666",
  type: "world-class",
  slug: "councilor",
  title: "Councilor",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
