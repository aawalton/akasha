import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const levelingUpTheWorld5 = {
  id: "019db533-f391-714b-ad24-c1df3a4d767b",
  type: "page-type/book",
  slug: "leveling-up-the-world-5",
  title: "Leveling Up The World 5",
  status: "completed",
  author: "Houghton Mifflin Company Staff",
  unit: "unit/words",
  position: 5,
  ownLength: 137000,
  ownProgress: 137000,
  publishedAt: "2023-10-17",
  partOfCollections: ["book-series/leveling-up-the-world"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0C6FMM2GC",
      externalLink: "https://amazon.com/dp/B0C6FMM2GC",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
