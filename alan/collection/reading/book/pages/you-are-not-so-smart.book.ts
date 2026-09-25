import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const youAreNotSoSmart = {
  id: "019db533-f39d-7f63-9cf5-4669704ad6d5",
  type: "page-type/book",
  slug: "you-are-not-so-smart",
  title: "You Are Not So Smart",
  status: "not-started",
  author: "David McRaney",
  unit: "unit/words",
  ownLength: 126000,
} as const satisfies Book
