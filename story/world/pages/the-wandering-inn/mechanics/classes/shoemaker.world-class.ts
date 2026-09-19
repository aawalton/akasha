import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const shoemaker = {
  id: "01a06586-0a3b-79c2-808d-737fada7e27c",
  type: "page-type/world-class",
  slug: "shoemaker",
  title: "Shoemaker",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
