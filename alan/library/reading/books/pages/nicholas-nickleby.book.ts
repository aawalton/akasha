import type { Book } from "../book.page-type.types.ts"

export const nicholasNickleby = {
  id: "019db533-f39d-7ad7-9826-052280645a61",
  pageTypeSlug: "book",
  type: "book",
  slug: "nicholas-nickleby",
  title: "Nicholas Nickleby",
  status: "not-started",
  author: "Charles Dickens",
  unit: "words",
  position: 1,
  ownLength: 208500,
} as const satisfies Book
