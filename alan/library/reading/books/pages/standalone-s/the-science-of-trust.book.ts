import type { Book } from "../../book.page-type.ts"

export const theScienceOfTrust = {
  id: "019db533-f39d-7f6b-9140-56bd69fcd686",
  pageTypeSlug: "book",
  slug: "the-science-of-trust",
  title: "The Science of Trust",
  status: "completed",
  rank: "C",
  author: "John Mordechai Gottman",
  unitSlug: "words",
  ownLength: 246300,
  ownProgress: 246300,
  publishedAt: "2012-04-01",
} as const satisfies Book
