import type { Book } from "../../book.page-type.ts"

export const smartChange = {
  id: "019db533-f39e-70ed-ab0c-5d6de0ba48fd",
  pageTypeSlug: "book",
  slug: "smart-change",
  title: "Smart Change",
  status: "not-started",
  author: "Art Markman  PhD",
  unitSlug: "words",
  ownLength: 112800,
} as const satisfies Book
