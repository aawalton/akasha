import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theLostFleetCourageous = {
  id: "019db533-f39a-7916-97d1-f6735b8afd96",
  type: "page-type/book",
  slug: "the-lost-fleet-courageous",
  title: "The Lost Fleet: Courageous",
  status: "not-started",
  author: "Jack Campbell",
  unit: "unit/words",
  position: 2,
  ownLength: 80500,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000UZNRXM",
      externalLink: "https://www.amazon.com/dp/B000UZNRXM",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
