import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const abacusCounter = {
  id: "01a0657e-01a1-7b5e-a806-7325f4775a04",
  type: "page-type/world-class",
  slug: "abacus-counter",
  title: "Abacus Counter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
