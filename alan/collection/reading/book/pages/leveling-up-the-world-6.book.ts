import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const levelingUpTheWorld6 = {
  id: "019db533-f391-710c-b33c-99232d4328df",
  type: "page-type/book",
  slug: "leveling-up-the-world-6",
  title: "Leveling Up The World 6",
  status: "completed",
  author: "Houghton Mifflin Harcourt Staff",
  unit: "unit/words",
  position: 6,
  ownLength: 184500,
  ownProgress: 184500,
  publishedAt: "2024-01-17",
  partOfCollections: ["book-series/leveling-up-the-world"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CKXY8VBQ",
      externalLink: "https://amazon.com/dp/B0CKXY8VBQ",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
