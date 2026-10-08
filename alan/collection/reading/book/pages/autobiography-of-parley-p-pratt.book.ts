import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const autobiographyOfParleyPPratt = {
  id: "019db533-f39d-7c07-b7d2-6a075f3a46a3",
  type: "page-type/book",
  slug: "autobiography-of-parley-p-pratt",
  title: "Autobiography of Parley P. Pratt",
  status: "not-started",
  author: "Parley P. Pratt",
  unit: "unit/words",
  position: 6,
  ownLength: 152250,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
