import type { Book } from "../../book.page-type.ts"

export const bookOfMormonReferenceCompanion = {
  id: "019db533-f39d-7b39-8df0-7583648c0759",
  pageTypeSlug: "book",
  slug: "book-of-mormon-reference-companion",
  title: "Book of Mormon Reference Companion",
  kind: "read",
  status: "paused",
  author: "Dennis L. Largey",
  unitSlug: "words",
  position: 4,
  ownLength: 207000,
  ownProgress: 24000,
} as const satisfies Book
