import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const villageHeadwoman = {
  id: "01a0657e-026f-74ed-bdff-f9906ed7a970",
  type: "page-type/world-class",
  slug: "village-headwoman",
  title: "Village Headwoman",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
