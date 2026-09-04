import type { Book } from "../../book.page-type.ts"

export const meekAndLowly = {
  id: "019db533-f39d-708b-9cf7-65491d8e7053",
  pageTypeSlug: "book",
  slug: "meek-and-lowly",
  title: "Meek and Lowly",
  status: "completed",
  rank: "C",
  author: "Neal A. Maxwell",
  unitSlug: "words",
  position: 2,
  ownLength: 30000,
  ownProgress: 30000,
} as const satisfies Book
