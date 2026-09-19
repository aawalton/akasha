import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const oldHorndog = {
  id: "01a0657e-13b3-7ba4-84e8-8b8f01bb4cba",
  type: "page-type/world-class",
  slug: "old-horndog",
  title: "Old Horndog",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
