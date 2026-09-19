import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const hawker = {
  id: "01a0657e-01ee-7201-a4e1-a349627d257e",
  type: "page-type/world-class",
  slug: "hawker",
  title: "Hawker",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
