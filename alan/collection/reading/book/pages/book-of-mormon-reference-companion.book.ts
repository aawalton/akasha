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
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
