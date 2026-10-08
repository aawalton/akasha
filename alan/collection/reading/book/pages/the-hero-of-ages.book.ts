import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theHeroOfAges = {
  id: "019db533-f39d-7023-a9e2-1ba3b61f850f",
  type: "page-type/book",
  slug: "the-hero-of-ages",
  title: "The Hero of Ages",
  status: "not-started",
  author: "Brandon Sanderson",
  unit: "unit/words",
  position: 3,
  ownLength: 186750,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B002LC8HF0",
      externalLink: "https://www.amazon.com/dp/B002LC8HF0",
    },
  ],
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
