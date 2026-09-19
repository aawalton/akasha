import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const pauper = {
  id: "01a0657e-13b6-7300-982c-47216711e0a1",
  type: "page-type/world-class",
  slug: "pauper",
  title: "Pauper",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
