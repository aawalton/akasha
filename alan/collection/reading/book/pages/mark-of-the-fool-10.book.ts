import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const markOfTheFool10 = {
  id: "019db533-f391-720c-acc4-8fe4c69d1950",
  type: "page-type/book",
  slug: "mark-of-the-fool-10",
  title: "Mark of the Fool 10",
  status: "completed",
  author: "J.M. Clarke",
  unit: "unit/words",
  position: 10,
  ownLength: 240750,
  ownProgress: 240750,
  publishedAt: "2025-07-30",
  partOfCollections: ["book-series/mark-of-the-fool"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DQVG53GL",
      externalLink: "https://amazon.com/dp/B0DQVG53GL",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
