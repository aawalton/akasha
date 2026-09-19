import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const hirelingMages = {
  id: "01a0657e-01f8-7534-aefc-834782ba1663",
  type: "page-type/world-class",
  slug: "hireling-mages",
  title: "Hireling Mages",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
