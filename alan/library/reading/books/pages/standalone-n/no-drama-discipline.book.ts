import type { Book } from "../../book.page-type.ts"

export const noDramaDiscipline = {
  id: "019db533-f39d-7fc5-8296-57a8f87a4f4a",
  pageTypeSlug: "book",
  slug: "no-drama-discipline",
  title: "No-Drama Discipline",
  kind: "read",
  status: "not-started",
  author: "Daniel J. Siegel",
  unitSlug: "words",
  ownLength: 124500,
} as const satisfies Book
