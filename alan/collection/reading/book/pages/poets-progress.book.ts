import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const poetsProgress = {
  id: "019db533-f39d-7ae5-81b9-c43c6e36fd5d",
  type: "page-type/book",
  slug: "poets-progress",
  title: "Poet's Progress",
  status: "not-started",
  author: "Ben Linsey-Bloom, Pamella Linsey",
  unit: "unit/words",
  position: 13,
  ownLength: 55750,
} as const satisfies Book
