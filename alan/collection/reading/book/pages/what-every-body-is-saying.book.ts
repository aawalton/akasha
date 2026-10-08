import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const whatEveryBodyIsSaying = {
  id: "019db533-f39d-7e9e-9929-88b5bc3f3c39",
  type: "page-type/book",
  slug: "what-every-body-is-saying",
  title: "What Every BODY Is Saying",
  status: "not-started",
  author: "Joe Navarro, Marvin Karlins",
  unit: "unit/words",
  ownLength: 109800,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
