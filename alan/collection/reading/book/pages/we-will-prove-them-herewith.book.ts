import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const weWillProveThemHerewith = {
  id: "019db533-f39c-7fd0-b6a0-bca9b3d73edd",
  type: "page-type/book",
  slug: "we-will-prove-them-herewith",
  title: "We Will Prove Them Herewith",
  status: "completed",
  grade: "C",
  author: "Neal A. Maxwell, Deseret Book Company",
  unit: "unit/words",
  position: 1,
  ownLength: 32000,
  ownProgress: 32000,
} as const satisfies Book
