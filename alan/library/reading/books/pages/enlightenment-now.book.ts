import type { Book } from "akasha/alan/library/reading/books/book.page-type.types.ts"

export const enlightenmentNow = {
  id: "019db533-f39e-71a5-a9a4-74f149a3e9b5",
  type: "book",
  slug: "enlightenment-now",
  title: "Enlightenment Now",
  status: "completed",
  rank: "A",
  author: "Steven Pinker, Pablo Hermida Lazcano",
  unit: "words",
  ownLength: 297300,
  ownProgress: 297300,
} as const satisfies Book
