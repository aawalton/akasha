import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const thePathOfAscension3 = {
  id: "019db533-f391-7395-aeb6-f665dc3e7549",
  type: "page-type/book",
  slug: "the-path-of-ascension-3",
  title: "The Path of Ascension 3",
  status: "completed",
  author: "C. Mantis",
  unit: "unit/words",
  position: 3,
  ownLength: 181250,
  ownProgress: 181250,
  publishedAt: "2023-05-17",
  partOfCollections: ["book-series/the-path-of-ascension"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BT5YQQKM",
      externalLink: "https://amazon.com/dp/B0BT5YQQKM",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
