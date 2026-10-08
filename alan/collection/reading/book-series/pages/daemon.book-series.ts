import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const daemon = {
  id: "019db533-f39b-7548-a85d-583374a54bdd",
  type: "page-type/book-series",
  slug: "daemon",
  title: "Daemon",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B074CDHK46",
      externalLink: "https://www.amazon.com/dp/B074CDHK46",
      lastSyncedAt: "2025-10-14",
    },
  ],
  createdAt: "2026-04-22T12:39:34.043Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
