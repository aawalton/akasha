import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const cultureInversions = {
  id: "019db533-f39a-7f74-aa81-fd55cdbac5c1",
  type: "page-type/book",
  slug: "culture-inversions",
  title: "Culture: Inversions",
  status: "not-started",
  author: "Jennifer Andrews, Arnold E. Davidson, Priscilla Walton",
  unit: "unit/words",
  position: 4,
  ownLength: 96250,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B002TXZR8G",
      externalLink: "https://www.amazon.com/dp/B002TXZR8G",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
