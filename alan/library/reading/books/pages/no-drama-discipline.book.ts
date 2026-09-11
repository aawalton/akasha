import type { Book } from "akasha/alan/library/reading/books/book.page-type.types.ts"

export const noDramaDiscipline = {
  id: "019db533-f39d-7fc5-8296-57a8f87a4f4a",
  type: "book",
  slug: "no-drama-discipline",
  title: "No-Drama Discipline",
  status: "not-started",
  author: "Daniel J. Siegel",
  unit: "words",
  ownLength: 124500,
} as const satisfies Book
