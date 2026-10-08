import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const thePrimalHunter2 = {
  id: "019db533-f391-7a5a-b132-8f7320adcaf8",
  type: "page-type/book",
  slug: "the-primal-hunter-2",
  title: "The Primal Hunter 2",
  status: "completed",
  author: "Zogarth",
  unit: "unit/words",
  position: 2,
  ownLength: 136000,
  ownProgress: 136000,
  publishedAt: "2022-06-14",
  partOfCollections: ["book-series/the-primal-hunter"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B09T6Z5DXT",
      externalLink: "https://amazon.com/dp/B09T6Z5DXT",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
