import type { Book } from "../../book.page-type.ts"

export const theBeginningOfInfinity2 = {
  id: "019db533-f39e-7196-8c32-fdac049597a6",
  pageTypeSlug: "book",
  slug: "the-beginning-of-infinity-2",
  title: "The Beginning of Infinity",
  kind: "read",
  status: "completed",
  rank: "S",
  author: "David Deutsch",
  unitSlug: "words",
  ownLength: 300000,
  ownProgress: 300000,
} as const satisfies Book
