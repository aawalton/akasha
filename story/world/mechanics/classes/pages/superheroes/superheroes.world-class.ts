import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superheroes = {
  id: "01a06586-0a5f-76ef-ad09-ba15424a45cf",
  type: "page-type/world-class",
  slug: "superheroes",
  title: "Superheroes",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
