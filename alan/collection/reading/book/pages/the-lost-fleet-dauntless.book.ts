import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theLostFleetDauntless = {
  id: "019db533-f39a-7925-b218-2ea7f627189d",
  type: "page-type/book",
  slug: "the-lost-fleet-dauntless",
  title: "The Lost Fleet: Dauntless",
  status: "not-started",
  author: "Jack Campbell",
  unit: "unit/words",
  ownLength: 76500,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000OZ0NXU",
      externalLink: "https://www.amazon.com/dp/B000OZ0NXU",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
