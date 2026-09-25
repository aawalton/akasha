import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const wheelOfTimeAMemoryOfLight = {
  id: "019db533-f39b-7254-9748-1cec5327e17e",
  type: "page-type/book",
  slug: "wheel-of-time-a-memory-of-light",
  title: "Wheel of Time: A Memory of Light",
  status: "completed",
  grade: "B",
  author: "Robert Jordan, Brandon Sanderson",
  unit: "unit/words",
  position: 14,
  ownLength: 256250,
  ownProgress: 256250,
  publishedAt: "2013-04-09",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B00BMKDTNC",
      externalLink: "https://amazon.com/dp/B00BMKDTNC",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
