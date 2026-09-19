import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const cleaningServant = {
  id: "01a0657e-01c7-76bb-bbe3-c47059ce3141",
  type: "page-type/world-class",
  slug: "cleaning-servant",
  title: "Cleaning Servant",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
