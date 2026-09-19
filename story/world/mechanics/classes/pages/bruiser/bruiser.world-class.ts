import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const bruiser = {
  id: "01a0657e-1341-737b-92a6-31f3bd0a346c",
  type: "page-type/world-class",
  slug: "bruiser",
  title: "Bruiser",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
