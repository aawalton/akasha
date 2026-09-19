import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const scrier = {
  id: "01a06586-0a2d-74d9-a2c8-8d27db2c2c4a",
  type: "page-type/world-class",
  slug: "scrier",
  title: "Scrier",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
