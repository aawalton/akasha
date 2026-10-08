import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theLostFleetVictorious = {
  id: "019db533-f39a-7880-a5d4-74315f02ad39",
  type: "page-type/book",
  slug: "the-lost-fleet-victorious",
  title: "The Lost Fleet: Victorious",
  status: "not-started",
  author: "Jack Campbell",
  unit: "unit/words",
  position: 5,
  ownLength: 88500,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B003NX7OLO",
      externalLink: "https://www.amazon.com/dp/B003NX7OLO",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
