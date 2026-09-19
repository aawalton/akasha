import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const toyMaker = {
  id: "01a0657e-026c-725b-a5d0-6ee6c1440db2",
  type: "page-type/world-class",
  slug: "toy-maker",
  title: "Toy Maker",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
