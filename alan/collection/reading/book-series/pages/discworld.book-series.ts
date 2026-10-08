import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const discworld = {
  id: "019db533-f39a-703a-9d25-6d7c7ee4731b",
  type: "page-type/book-series",
  slug: "discworld",
  title: "Discworld",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07TYGGG76",
      externalLink: "https://www.amazon.com/dp/B07TYGGG76",
      lastSyncedAt: "2025-10-14",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
