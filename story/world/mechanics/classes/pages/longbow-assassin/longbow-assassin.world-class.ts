import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const longbowAssassin = {
  id: "01a0657e-021b-7980-a1f2-93c9c6caaa08",
  type: "page-type/world-class",
  slug: "longbow-assassin",
  title: "Longbow Assassin",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
