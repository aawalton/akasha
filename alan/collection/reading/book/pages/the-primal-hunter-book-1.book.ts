import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const thePrimalHunterBook1 = {
  id: "019db533-f391-7b25-8910-ba992e0a4e9c",
  type: "page-type/book",
  slug: "the-primal-hunter-book-1",
  title: "The Primal Hunter",
  status: "completed",
  author: "Zogarth",
  unit: "unit/words",
  position: 1,
  ownLength: 178500,
  ownProgress: 178500,
  publishedAt: "2022-03-08",
  partOfCollections: ["book-series/the-primal-hunter"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B09MV3G8PG",
      externalLink: "https://amazon.com/dp/B09MV3G8PG",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
