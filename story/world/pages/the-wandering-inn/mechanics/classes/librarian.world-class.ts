import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const librarian = {
  id: "01a0657e-138d-7918-b839-c9b0aa23555d",
  type: "page-type/world-class",
  slug: "librarian",
  title: "Librarian",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
