import type { Book } from "../../book.page-type.ts"

export const emilyDickinson = {
  id: "019db533-f39d-794b-9bc8-189692535d77",
  pageTypeSlug: "book",
  slug: "emily-dickinson",
  title: "Emily Dickinson",
  status: "paused",
  author: "Thomas Herbert Johnson",
  unitSlug: "words",
  position: 1,
  ownLength: 79000,
  ownProgress: 2250,
} as const satisfies Book
