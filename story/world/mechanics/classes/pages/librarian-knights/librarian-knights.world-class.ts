import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const librarianKnights = {
  id: "01a0657e-021a-7186-843d-60b34963d72a",
  type: "page-type/world-class",
  slug: "librarian-knights",
  title: "Librarian Knights",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
