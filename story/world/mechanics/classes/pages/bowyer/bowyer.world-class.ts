import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const bowyer = {
  id: "01a0657e-1340-70d5-af37-6790fb24cee4",
  type: "page-type/world-class",
  slug: "bowyer",
  title: "Bowyer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
