import type { Book } from "../../book.page-type.ts"

export const enlightenmentNow = {
  id: "019db533-f39e-71a5-a9a4-74f149a3e9b5",
  pageTypeSlug: "book",
  slug: "enlightenment-now",
  title: "Enlightenment Now",
  kind: "read",
  status: "completed",
  rank: "A",
  author: "Steven Pinker, Pablo Hermida Lazcano",
  unitSlug: "words",
  ownLength: 297300,
  ownProgress: 297300,
} as const satisfies Book
