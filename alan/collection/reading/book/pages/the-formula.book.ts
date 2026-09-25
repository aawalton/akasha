import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theFormula = {
  id: "019db533-f39d-7ecf-82e4-4c168dbf2889",
  type: "page-type/book",
  slug: "the-formula",
  title: "The Formula",
  status: "not-started",
  author: "Albert-László Barabási",
  unit: "unit/words",
  ownLength: 118500,
} as const satisfies Book
