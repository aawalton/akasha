import type { Book } from "../../book.page-type.ts"

export const defiant = {
  id: "019db533-f39c-7fff-89d0-2bc7b1b8eb0c",
  pageTypeSlug: "book",
  slug: "defiant",
  title: "Defiant",
  kind: "read",
  status: "completed",
  rank: "B",
  author: "Lynne Graham",
  unitSlug: "words",
  position: 4,
  ownLength: 105000,
  ownProgress: 105000,
} as const satisfies Book
