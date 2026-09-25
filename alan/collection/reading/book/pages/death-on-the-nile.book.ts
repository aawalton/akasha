import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const deathOnTheNile = {
  id: "019db533-f399-7d0a-94ad-a0cfdf7243c3",
  type: "page-type/book",
  slug: "death-on-the-nile",
  title: "Death on the Nile",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 15,
} as const satisfies Book
