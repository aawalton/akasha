import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theFabricOfReality2 = {
  id: "019db533-f39e-7243-b7eb-952ecaa60650",
  type: "page-type/book",
  slug: "the-fabric-of-reality-2",
  title: "The Fabric of Reality",
  status: "completed",
  grade: "S",
  author: "David Deutsch",
  unit: "unit/words",
  ownLength: 216450,
  ownProgress: 216450,
} as const satisfies Book
