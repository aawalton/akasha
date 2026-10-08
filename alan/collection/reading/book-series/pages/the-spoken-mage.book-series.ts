import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const theSpokenMage = {
  id: "019db533-f39b-74e0-b4c7-01fb53ebe3c6",
  type: "page-type/book-series",
  slug: "the-spoken-mage",
  title: "The Spoken Mage",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07MB9K2GY",
      externalLink: "https://www.amazon.com/dp/B07MB9K2GY",
      lastSyncedAt: "2025-10-14",
    },
  ],
  createdAt: "2026-04-22T12:39:34.043Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
