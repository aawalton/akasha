import type { Book } from "../../book.page-type.ts"

export const youAreNotSoSmart = {
  id: "019db533-f39d-7f63-9cf5-4669704ad6d5",
  pageTypeSlug: "book",
  slug: "you-are-not-so-smart",
  title: "You Are Not So Smart",
  kind: "read",
  status: "not-started",
  author: "David McRaney",
  unitSlug: "words",
  ownLength: 126000,
} as const satisfies Book
