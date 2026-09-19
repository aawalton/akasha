import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const wanderer = {
  id: "01a0657e-026f-798a-96f6-c94cfaf56a73",
  type: "page-type/world-class",
  slug: "wanderer",
  title: "Wanderer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
