import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theLastHorizonTheCaptain = {
  id: "019db533-f39a-7b3d-9ce3-fa2fbbe2ae41",
  type: "page-type/book",
  slug: "the-last-horizon-the-captain",
  title: "The Last Horizon: The Captain",
  status: "not-started",
  author: "Will Wight",
  unit: "unit/words",
  ownLength: 105000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BXPYQD4D",
      externalLink: "https://www.amazon.com/dp/B0BXPYQD4D",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
