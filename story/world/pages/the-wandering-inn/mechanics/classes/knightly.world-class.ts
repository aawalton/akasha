import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const knightly = {
  id: "01a0657e-137d-75c0-a8f2-1baa7758c3eb",
  type: "page-type/world-class",
  slug: "knightly",
  title: "Knightly",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
