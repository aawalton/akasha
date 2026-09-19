import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const bookies = {
  id: "01a0657e-01bf-7a31-b073-e7769d770f83",
  type: "page-type/world-class",
  slug: "bookies",
  title: "Bookies",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
