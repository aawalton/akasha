import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const theConnectedSystem = {
  id: "019db533-f38b-768f-b451-06c450038e39",
  type: "page-type/book-series",
  slug: "the-connected-system",
  title: "The Connected System",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CW19LKFJ",
      externalLink: "https://www.amazon.com/dp/B0CW19LKFJ",
      lastSyncedAt: "2025-10-14",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
