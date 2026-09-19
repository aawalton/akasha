import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const swordswomen = {
  id: "01a06586-0a62-77a1-9a37-5633ed159203",
  type: "page-type/world-class",
  slug: "swordswomen",
  title: "Swordswomen",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
