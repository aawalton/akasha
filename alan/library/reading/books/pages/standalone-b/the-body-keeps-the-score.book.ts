import type { Book } from "../../book.page-type.ts"

export const theBodyKeepsTheScore = {
  id: "019db533-f39d-7e6e-b65e-be009fd367dc",
  pageTypeSlug: "book",
  slug: "the-body-keeps-the-score",
  title: "The Body Keeps the Score",
  status: "completed",
  author: "Bessel van der Kolk",
  unitSlug: "words",
  ownLength: 243750,
  ownProgress: 243750,
} as const satisfies Book
