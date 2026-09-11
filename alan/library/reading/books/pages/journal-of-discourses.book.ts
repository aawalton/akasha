import type { Book } from "akasha/alan/library/reading/books/book.page-type.types.ts"

export const journalOfDiscourses = {
  id: "019db533-f39d-7a1b-9aad-df5865505f9d",
  type: "book",
  slug: "journal-of-discourses",
  title: "Journal of Discourses",
  status: "not-started",
  author: "Brigham Young",
  unit: "words",
  position: 2,
} as const satisfies Book
