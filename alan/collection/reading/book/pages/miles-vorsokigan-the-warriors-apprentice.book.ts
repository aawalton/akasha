import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const milesVorsokiganTheWarriorsApprentice = {
  id: "019db533-f39a-7a36-b3f6-9e6bb8074f8c",
  type: "page-type/book",
  slug: "miles-vorsokigan-the-warriors-apprentice",
  title: "Miles Vorsokigan: The Warrior's Apprentice",
  status: "not-started",
  unit: "unit/words",
  position: 1,
  ownLength: 93000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B005DNGSUU",
      externalLink: "https://www.amazon.com/dp/B005DNGSUU",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
