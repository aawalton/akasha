import type { Book } from "../../book.page-type.ts"

export const evershore = {
  id: "019db533-f39c-7f8a-9bb5-62a9f0c05a6a",
  pageTypeSlug: "book",
  slug: "evershore",
  title: "Evershore",
  status: "completed",
  rank: "B",
  author: "Brandon Sanderson, Janci Patterson",
  unitSlug: "words",
  position: 3,
  ownLength: 103500,
  ownProgress: 103500,
} as const satisfies Book
