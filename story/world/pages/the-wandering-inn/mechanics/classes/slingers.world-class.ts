import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const slingers = {
  id: "01a0657e-0258-753d-85cc-d6a23ca8f47b",
  type: "page-type/world-class",
  slug: "slingers",
  title: "Slingers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
