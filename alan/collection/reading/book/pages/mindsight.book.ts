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
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
