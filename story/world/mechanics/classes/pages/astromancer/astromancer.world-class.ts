import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const astromancer = {
  id: "01a0657e-01ae-7008-a756-02f58ef8d3fc",
  type: "page-type/world-class",
  slug: "astromancer",
  title: "Astromancer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
