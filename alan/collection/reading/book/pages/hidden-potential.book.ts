import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const hiddenPotential = {
  id: "019db533-f39e-722d-b1a9-b056924a0864",
  type: "page-type/book",
  slug: "hidden-potential",
  title: "Hidden Potential",
  status: "not-started",
  author: "Adam Grant",
  unit: "unit/words",
  ownLength: 110250,
} as const satisfies Book
