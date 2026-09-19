import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const summerKnights = {
  id: "01a06586-0a5e-7ee6-b299-157c86ff872f",
  type: "page-type/world-class",
  slug: "summer-knights",
  title: "Summer Knights",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
