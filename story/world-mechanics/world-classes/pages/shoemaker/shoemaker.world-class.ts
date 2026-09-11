import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const shoemaker = {
  id: "01a06586-0a3b-79c2-808d-737fada7e27c",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "shoemaker",
  title: "Shoemaker",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
