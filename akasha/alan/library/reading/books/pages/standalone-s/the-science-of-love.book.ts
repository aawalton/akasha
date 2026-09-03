import type { Book } from "../../book.page-type.ts"

export const theScienceOfLove = {
  id: "019db533-f39d-7f06-add8-80e7ba704104",
  pageTypeSlug: "book",
  slug: "the-science-of-love",
  title: "The Science of Love",
  kind: "read",
  status: "not-started",
  author: "John Baines",
  unitSlug: "words",
  ownLength: 76050,
} as const satisfies Book
