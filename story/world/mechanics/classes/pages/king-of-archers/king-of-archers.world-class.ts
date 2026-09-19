import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const kingOfArchers = {
  id: "01a0657e-020c-7e66-b0d9-c2e15beb5e91",
  type: "page-type/world-class",
  slug: "king-of-archers",
  title: "King of Archers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
