import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const enlightenmentNow = {
  id: "019db533-f39e-71a5-a9a4-74f149a3e9b5",
  type: "page-type/book",
  slug: "enlightenment-now",
  title: "Enlightenment Now",
  status: "completed",
  grade: "A",
  author: "Steven Pinker, Pablo Hermida Lazcano",
  unit: "unit/words",
  ownLength: 297300,
  ownProgress: 297300,
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
