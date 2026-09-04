import type { Book } from "../../book.page-type.ts"

export const youAreNowLessDumb = {
  id: "019db533-f39d-7df7-8fc6-ce34286333da",
  pageTypeSlug: "book",
  slug: "you-are-now-less-dumb",
  title: "You Are Now Less Dumb",
  kind: "read",
  status: "not-started",
  author: "David McRaney",
  unitSlug: "words",
  ownLength: 130050,
} as const satisfies Book
