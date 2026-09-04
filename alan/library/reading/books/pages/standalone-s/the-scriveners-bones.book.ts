import type { Book } from "../../book.page-type.ts"

export const theScrivenersBones = {
  id: "019db533-f39d-71fe-921d-f4c58cf7430b",
  pageTypeSlug: "book",
  slug: "the-scriveners-bones",
  title: "The Scrivener's Bones",
  status: "completed",
  rank: "B",
  author: "Brandon Sanderson",
  unitSlug: "words",
  position: 2,
  ownLength: 89250,
  ownProgress: 89250,
} as const satisfies Book
