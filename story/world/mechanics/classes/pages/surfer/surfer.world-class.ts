import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const surfer = {
  id: "01a0657e-0262-78ac-a263-522c1b27ee5a",
  type: "page-type/world-class",
  slug: "surfer",
  title: "Surfer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
