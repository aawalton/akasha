import type { Book } from "../../book.page-type.ts"

export const cytonic = {
  id: "019db533-f39c-7f6c-8542-d6c871039189",
  pageTypeSlug: "book",
  slug: "cytonic",
  title: "Cytonic",
  status: "completed",
  rank: "B",
  author: "Brandon Sanderson",
  unitSlug: "words",
  position: 3,
  ownLength: 103750,
  ownProgress: 103750,
} as const satisfies Book
