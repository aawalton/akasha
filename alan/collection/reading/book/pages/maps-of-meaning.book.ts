import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const mapsOfMeaning = {
  id: "019db533-f39e-709d-9e71-284070d76509",
  type: "page-type/book",
  slug: "maps-of-meaning",
  title: "Maps of Meaning",
  status: "completed",
  grade: "C",
  author: "Jordan B. Peterson",
  unit: "unit/words",
  ownLength: 463050,
  ownProgress: 463050,
} as const satisfies Book
