import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const springKnight = {
  id: "01a0657e-025e-7b10-9c29-e2d8062b3761",
  type: "page-type/world-class",
  slug: "spring-knight",
  title: "Spring Knight",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
