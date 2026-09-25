import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const mindsight = {
  id: "019db533-f39e-70c5-93b8-e764ea3bcc4e",
  type: "page-type/book",
  slug: "mindsight",
  title: "Mindsight",
  status: "not-started",
  author: "Daniel J. Siegel",
  unit: "unit/words",
  ownLength: 176250,
} as const satisfies Book
