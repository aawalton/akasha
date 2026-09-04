import type { Book } from "../../book.page-type.ts"

export const autobiographyOfParleyPPratt = {
  id: "019db533-f39d-7c07-b7d2-6a075f3a46a3",
  pageTypeSlug: "book",
  slug: "autobiography-of-parley-p-pratt",
  title: "Autobiography of Parley P. Pratt",
  status: "not-started",
  author: "Parley P. Pratt",
  unitSlug: "words",
  position: 6,
  ownLength: 152250,
} as const satisfies Book
