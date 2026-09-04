import type { Book } from "../../book.page-type.ts"

export const sunreach = {
  id: "019db533-f39c-7f74-917a-a7b9bc781a8e",
  pageTypeSlug: "book",
  slug: "sunreach",
  title: "Sunreach",
  kind: "read",
  status: "completed",
  rank: "B",
  author: "Brandon Sanderson, Janci Patterson",
  unitSlug: "words",
  position: 1,
  ownLength: 78500,
  ownProgress: 78500,
} as const satisfies Book
