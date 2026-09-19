import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const musicians = {
  id: "01a0657e-13a3-771c-a914-ee3a925b27a1",
  type: "page-type/world-class",
  slug: "musicians",
  title: "Musicians",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
