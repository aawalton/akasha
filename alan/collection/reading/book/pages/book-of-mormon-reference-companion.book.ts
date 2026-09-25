import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const bookOfMormonReferenceCompanion = {
  id: "019db533-f39d-7b39-8df0-7583648c0759",
  type: "page-type/book",
  slug: "book-of-mormon-reference-companion",
  title: "Book of Mormon Reference Companion",
  status: "paused",
  author: "Dennis L. Largey",
  unit: "unit/words",
  position: 4,
  ownLength: 207000,
  ownProgress: 24000,
} as const satisfies Book
