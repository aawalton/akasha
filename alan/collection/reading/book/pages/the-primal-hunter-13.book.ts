import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const thePrimalHunter13 = {
  id: "019db533-f391-7a28-a881-95891bbd85da",
  type: "page-type/book",
  slug: "the-primal-hunter-13",
  title: "The Primal Hunter 13",
  status: "completed",
  author: "Nick Roberts, Greg Kramer",
  unit: "unit/words",
  position: 13,
  ownLength: 151500,
  ownProgress: 151500,
  publishedAt: "2025-07-23",
  partOfCollections: ["book-series/the-primal-hunter"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0F1Z5F7GH",
      externalLink: "https://amazon.com/dp/B0F1Z5F7GH",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
