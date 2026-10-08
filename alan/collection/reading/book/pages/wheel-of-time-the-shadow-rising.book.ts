import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const wheelOfTimeTheShadowRising = {
  id: "019db533-f39a-79be-a361-30b772d54a11",
  type: "page-type/book",
  slug: "wheel-of-time-the-shadow-rising",
  title: "Wheel of Time: The Shadow Rising",
  status: "completed",
  grade: "B",
  author: "Robert Jordan",
  unit: "unit/words",
  position: 4,
  ownLength: 262750,
  ownProgress: 262750,
  publishedAt: "2010-01-13",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B00329UWL8",
      externalLink: "https://amazon.com/dp/B00329UWL8",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
