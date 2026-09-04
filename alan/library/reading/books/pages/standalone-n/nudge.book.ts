import type { Book } from "../../book.page-type.ts"

export const nudge = {
  id: "019db533-f39d-7f91-b919-f90bdcaafcc0",
  pageTypeSlug: "book",
  slug: "nudge",
  title: "Nudge",
  status: "not-started",
  author: "Richard H. Thaler, Cass R. Sunstein",
  unitSlug: "words",
  ownLength: 171450,
} as const satisfies Book
