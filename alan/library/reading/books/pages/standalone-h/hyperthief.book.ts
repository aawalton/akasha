import type { Book } from "../../book.page-type.ts"

export const hyperthief = {
  id: "019db533-f39c-7f5c-8432-ae3745fe8782",
  pageTypeSlug: "book",
  slug: "hyperthief",
  title: "Hyperthief",
  status: "completed",
  rank: "B",
  author: "Brandon Sanderson, Janci Patterson",
  unitSlug: "words",
  position: 4,
  ownLength: 5500,
  ownProgress: 5500,
} as const satisfies Book
