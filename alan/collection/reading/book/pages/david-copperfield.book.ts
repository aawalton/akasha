import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const davidCopperfield = {
  id: "019db533-f39d-7baf-8ba3-212209a6fa2c",
  type: "page-type/book",
  slug: "david-copperfield",
  title: "David Copperfield",
  status: "not-started",
  author: "Charles Dickens",
  unit: "unit/words",
  position: 7,
  ownLength: 217750,
} as const satisfies Book
