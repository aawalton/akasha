import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const royalTracker = {
  id: "01a0657e-0249-78ea-b0aa-6595207f2c66",
  type: "page-type/world-class",
  slug: "royal-tracker",
  title: "Royal Tracker",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
