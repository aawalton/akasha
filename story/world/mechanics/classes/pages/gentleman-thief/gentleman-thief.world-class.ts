import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const gentlemanThief = {
  id: "01a0657e-01e1-73f7-9674-8f48a90bc2cb",
  type: "page-type/world-class",
  slug: "gentleman-thief",
  title: "Gentleman Thief",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
