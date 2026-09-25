import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const noDramaDiscipline = {
  id: "019db533-f39d-7fc5-8296-57a8f87a4f4a",
  type: "page-type/book",
  slug: "no-drama-discipline",
  title: "No-Drama Discipline",
  status: "not-started",
  author: "Daniel J. Siegel",
  unit: "unit/words",
  ownLength: 124500,
} as const satisfies Book
