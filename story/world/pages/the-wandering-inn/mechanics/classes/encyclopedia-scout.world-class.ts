import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const encyclopediaScout = {
  id: "01a0657e-1360-7609-bfad-874801048adf",
  type: "page-type/world-class",
  slug: "encyclopedia-scout",
  title: "Encyclopedia Scout",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
