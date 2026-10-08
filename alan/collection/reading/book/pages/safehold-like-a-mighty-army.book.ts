import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const safeholdLikeAMightyArmy = {
  id: "019db533-f39a-7efd-b84b-9e8dc8a802df",
  type: "page-type/book",
  slug: "safehold-like-a-mighty-army",
  title: "Safehold: Like a Mighty Army",
  status: "not-started",
  author: "David Weber",
  unit: "unit/words",
  position: 6,
  ownLength: 168250,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B00EGJ3R1U",
      externalLink: "https://www.amazon.com/dp/B00EGJ3R1U",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
