import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const nicholasNickleby = {
  id: "019db533-f39d-7ad7-9826-052280645a61",
  type: "page-type/book",
  slug: "nicholas-nickleby",
  title: "Nicholas Nickleby",
  status: "not-started",
  author: "Charles Dickens",
  unit: "unit/words",
  position: 1,
  ownLength: 208500,
} as const satisfies Book
