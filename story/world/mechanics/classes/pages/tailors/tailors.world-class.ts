import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const tailors = {
  id: "01a06586-0a63-7e8b-8097-75a2d6033e54",
  type: "page-type/world-class",
  slug: "tailors",
  title: "Tailors",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
