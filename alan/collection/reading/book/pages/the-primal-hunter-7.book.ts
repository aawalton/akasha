import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const thePrimalHunter7 = {
  id: "019db533-f391-7a62-bc02-6dd4931f35c4",
  type: "page-type/book",
  slug: "the-primal-hunter-7",
  title: "The Primal Hunter 7",
  status: "completed",
  author: "Nick Roberts, Greg Kramer",
  unit: "unit/words",
  position: 7,
  ownLength: 180500,
  ownProgress: 180500,
  publishedAt: "2023-09-20",
  partOfCollections: ["book-series/the-primal-hunter"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0C6W5XQNW",
      externalLink: "https://amazon.com/dp/B0C6W5XQNW",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
