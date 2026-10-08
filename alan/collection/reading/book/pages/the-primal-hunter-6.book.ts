import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const thePrimalHunter6 = {
  id: "019db533-f391-7a6a-ab63-752a5aab65f3",
  type: "page-type/book",
  slug: "the-primal-hunter-6",
  title: "The Primal Hunter 6",
  status: "completed",
  author: "Nick Roberts, Greg Kramer",
  unit: "unit/words",
  position: 6,
  ownLength: 167500,
  ownProgress: 167500,
  publishedAt: "2023-06-09",
  partOfCollections: ["book-series/the-primal-hunter"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BW17HMDZ",
      externalLink: "https://amazon.com/dp/B0BW17HMDZ",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
