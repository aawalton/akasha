import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const uselessEater = {
  id: "01a06586-0a6e-741d-aaa0-b899f257818d",
  type: "page-type/world-class",
  slug: "useless-eater",
  title: "Useless Eater",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
