import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const telekinetic = {
  id: "01a06586-0a64-708f-a5ac-7a5ce363f3af",
  type: "page-type/world-class",
  slug: "telekinetic",
  title: "Telekinetic",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
