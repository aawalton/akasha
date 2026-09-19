import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const pikeman = {
  id: "01a06586-0a06-74e0-a512-c10d68e86b35",
  type: "page-type/world-class",
  slug: "pikeman",
  title: "Pikeman",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
