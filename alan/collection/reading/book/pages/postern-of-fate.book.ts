import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const posternOfFate = {
  id: "019db533-f399-7c75-84f8-de76ff96edcd",
  type: "page-type/book",
  slug: "postern-of-fate",
  title: "Postern of Fate",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 5,
} as const satisfies Book
