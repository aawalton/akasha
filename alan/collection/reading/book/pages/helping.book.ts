import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const helping = {
  id: "019db533-f39e-71ed-a35c-74762b7e1164",
  type: "page-type/book",
  slug: "helping",
  title: "Helping",
  status: "not-started",
  author: "Kathryn Stockett, Álvaro Abella Villar, Alvaro Abella",
  unit: "unit/words",
  ownLength: 76200,
} as const satisfies Book
