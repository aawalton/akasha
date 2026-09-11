import type { Book } from "akasha/alan/library/reading/books/book.page-type.types.ts"

export const theHeroOfAges = {
  id: "019db533-f39d-7023-a9e2-1ba3b61f850f",
  type: "book",
  slug: "the-hero-of-ages",
  title: "The Hero of Ages",
  status: "not-started",
  author: "Brandon Sanderson",
  unit: "words",
  position: 3,
  ownLength: 186750,
  source: "kindle",
  externalId: "B002LC8HF0",
  externalLink: "https://www.amazon.com/dp/B002LC8HF0",
} as const satisfies Book
