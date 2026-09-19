import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const songwriter = {
  id: "01a06586-0a4d-77b5-848e-160772ca1860",
  type: "page-type/world-class",
  slug: "songwriter",
  title: "Songwriter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
