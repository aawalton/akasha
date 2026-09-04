import type { Book } from "../../book.page-type.ts"

export const teachingsOfDavidOMckay = {
  id: "019db533-f39d-7994-9a48-16de0b257432",
  pageTypeSlug: "book",
  slug: "teachings-of-david-o-mckay",
  title: "Teachings of David O. McKay",
  status: "not-started",
  author: "David Oman McKay",
  unitSlug: "words",
  position: 10,
  ownLength: 146000,
} as const satisfies Book
