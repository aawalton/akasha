import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const bookbinder = {
  id: "01a0657e-01bf-7515-b6d4-e4abdd0e89c8",
  type: "page-type/world-class",
  slug: "bookbinder",
  title: "Bookbinder",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
