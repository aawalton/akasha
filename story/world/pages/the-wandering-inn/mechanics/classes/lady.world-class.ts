import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const lady = {
  id: "01a0657e-138c-7d61-a8d1-d205660f86b7",
  type: "page-type/world-class",
  slug: "lady",
  title: "Lady",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
