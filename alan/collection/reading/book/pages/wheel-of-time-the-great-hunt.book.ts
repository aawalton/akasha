import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const wheelOfTimeTheGreatHunt = {
  id: "019db533-f39a-7a6c-93d9-191ee648fa8e",
  type: "page-type/book",
  slug: "wheel-of-time-the-great-hunt",
  title: "Wheel of Time: The Great Hunt",
  status: "completed",
  grade: "B",
  author: "Robert Jordan",
  unit: "unit/words",
  position: 2,
  ownLength: 164500,
  ownProgress: 164500,
  publishedAt: "2009-11-11",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B002VBV1R2",
      externalLink: "https://amazon.com/dp/B002VBV1R2",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
