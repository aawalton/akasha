import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const wheelOfTimeTheFiresOfHeaven = {
  id: "019db533-f39a-7ba8-9048-b1162fabff31",
  type: "page-type/book",
  slug: "wheel-of-time-the-fires-of-heaven",
  title: "Wheel of Time: The Fires of Heaven",
  status: "completed",
  grade: "B",
  author: "Robert Jordan",
  unit: "unit/words",
  position: 5,
  ownLength: 231500,
  ownProgress: 231500,
  publishedAt: "2010-02-10",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0037V18D2",
      externalLink: "https://amazon.com/dp/B0037V18D2",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
