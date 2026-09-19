import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const sailor = {
  id: "01a0657e-024a-7aa5-92a6-efbb41072ffe",
  type: "page-type/world-class",
  slug: "sailor",
  title: "Sailor",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
