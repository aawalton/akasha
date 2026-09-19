import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const leatherworker = {
  id: "01a0657e-021a-76f8-9095-facb0b7ad940",
  type: "page-type/world-class",
  slug: "leatherworker",
  title: "Leatherworker",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
