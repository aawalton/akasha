import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const mobyDick = {
  id: "019db533-f39d-7ab7-8690-69a7bad358cb",
  type: "page-type/book",
  slug: "moby-dick",
  title: "Moby Dick",
  status: "not-started",
  author: "Herman Melville",
  unit: "unit/words",
  position: 4,
  ownLength: 153750,
} as const satisfies Book
