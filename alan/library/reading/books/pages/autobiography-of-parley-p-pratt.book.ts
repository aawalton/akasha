import type { Book } from "akasha/alan/library/reading/books/book.page-type.types.ts"

export const autobiographyOfParleyPPratt = {
  id: "019db533-f39d-7c07-b7d2-6a075f3a46a3",
  type: "book",
  slug: "autobiography-of-parley-p-pratt",
  title: "Autobiography of Parley P. Pratt",
  status: "not-started",
  author: "Parley P. Pratt",
  unit: "words",
  position: 6,
  ownLength: 152250,
} as const satisfies Book
