import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const bookseller = {
  id: "01a0657e-01bf-7328-a6ca-3324a015e49a",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "bookseller",
  title: "Bookseller",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
