import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const aPocketFullOfRye = {
  id: "019db533-f399-7b95-b8df-a25f20e1975e",
  type: "page-type/book",
  slug: "a-pocket-full-of-rye",
  title: "A Pocket Full of Rye",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 7,
} as const satisfies Book
