import type { Book } from "../../book.page-type.ts"

export const bookSwitch = {
  id: "019db533-f39e-7049-ba48-6466527e923a",
  pageTypeSlug: "book",
  slug: "book-switch",
  title: "Switch",
  status: "not-started",
  author: "Robert Lawrence Stine",
  unitSlug: "words",
  ownLength: 115800,
} as const satisfies Book
