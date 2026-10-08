import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theLostFleetFearless = {
  id: "019db533-f39a-78b6-ba38-581251a81216",
  type: "page-type/book",
  slug: "the-lost-fleet-fearless",
  title: "The Lost Fleet: Fearless",
  status: "not-started",
  author: "Jack Campbell",
  unit: "unit/words",
  position: 1,
  ownLength: 76500,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000SEGULG",
      externalLink: "https://www.amazon.com/dp/B000SEGULG",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
