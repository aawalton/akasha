import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const youAreNowLessDumb = {
  id: "019db533-f39d-7df7-8fc6-ce34286333da",
  type: "page-type/book",
  slug: "you-are-now-less-dumb",
  title: "You Are Now Less Dumb",
  status: "not-started",
  author: "David McRaney",
  unit: "unit/words",
  ownLength: 130050,
} as const satisfies Book
