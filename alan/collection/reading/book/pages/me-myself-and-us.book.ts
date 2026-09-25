import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const meMyselfAndUs = {
  id: "019db533-f39e-7041-a97b-9144cda89878",
  type: "page-type/book",
  slug: "me-myself-and-us",
  title: "Me, Myself, and Us",
  status: "not-started",
  author: "Brian R. Little Ph.D.",
  unit: "unit/words",
  ownLength: 132000,
} as const satisfies Book
