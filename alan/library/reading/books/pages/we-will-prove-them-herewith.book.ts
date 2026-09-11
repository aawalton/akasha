import type { Book } from "akasha/alan/library/reading/books/book.page-type.types.ts"

export const weWillProveThemHerewith = {
  id: "019db533-f39c-7fd0-b6a0-bca9b3d73edd",
  type: "book",
  slug: "we-will-prove-them-herewith",
  title: "We Will Prove Them Herewith",
  status: "completed",
  rank: "C",
  author: "Neal A. Maxwell, Deseret Book Company",
  unit: "words",
  position: 1,
  ownLength: 32000,
  ownProgress: 32000,
} as const satisfies Book
