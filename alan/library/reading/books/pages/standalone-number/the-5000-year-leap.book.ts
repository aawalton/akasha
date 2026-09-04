import type { Book } from "../../book.page-type.ts"

export const the5000YearLeap = {
  id: "019db533-f39d-78ee-85aa-65b7c8c280b0",
  pageTypeSlug: "book",
  slug: "the-5000-year-leap",
  title: "The 5000 Year Leap",
  status: "not-started",
  author: "W. Cleon Skousen",
  unitSlug: "words",
  position: 12,
  ownLength: 77500,
} as const satisfies Book
