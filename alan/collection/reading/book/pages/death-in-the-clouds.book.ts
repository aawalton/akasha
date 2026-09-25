import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const deathInTheClouds = {
  id: "019db533-f399-7c8a-864c-bf61a4d21755",
  type: "page-type/book",
  slug: "death-in-the-clouds",
  title: "Death in the Clouds",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 11,
} as const satisfies Book
