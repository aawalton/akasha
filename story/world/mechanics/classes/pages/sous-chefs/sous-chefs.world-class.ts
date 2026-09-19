import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const sousChefs = {
  id: "01a06586-0a4e-7dab-8c57-8297906635c8",
  type: "page-type/world-class",
  slug: "sous-chefs",
  title: "Sous Chefs",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
