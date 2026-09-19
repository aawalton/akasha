import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const pyromancer = {
  id: "01a0657e-0241-7ca6-80db-ab68433089e1",
  type: "page-type/world-class",
  slug: "pyromancer",
  title: "Pyromancer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
