import type { Book } from "../../book.page-type.ts"

export const paradiseLost = {
  id: "019db533-f39d-7a51-9743-9576b68e1c8c",
  pageTypeSlug: "book",
  slug: "paradise-lost",
  title: "Paradise Lost",
  kind: "read",
  status: "not-started",
  author: "John Milton",
  unitSlug: "words",
  position: 10,
  ownLength: 84500,
} as const satisfies Book
