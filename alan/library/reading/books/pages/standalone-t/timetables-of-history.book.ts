import type { Book } from "../../book.page-type.ts"

export const timetablesOfHistory = {
  id: "019db533-f39d-75e7-b285-f65a41cd0692",
  pageTypeSlug: "book",
  slug: "timetables-of-history",
  title: "Timetables of History",
  kind: "read",
  status: "not-started",
  author: "Bernard Grun",
  unitSlug: "words",
  position: 4,
  ownLength: 158250,
} as const satisfies Book
