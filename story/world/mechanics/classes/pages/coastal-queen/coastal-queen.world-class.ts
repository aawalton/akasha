import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const coastalQueen = {
  id: "01a0657e-01c7-77a0-bc30-aed77cdc784d",
  type: "page-type/world-class",
  slug: "coastal-queen",
  title: "Coastal Queen",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
