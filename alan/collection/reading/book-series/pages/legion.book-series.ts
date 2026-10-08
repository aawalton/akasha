import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const legion = {
  id: "019db533-f39d-742b-9dc2-5f8e7d08a552",
  type: "page-type/book-series",
  slug: "legion",
  title: "Legion",
  status: "not-started",
  unit: "unit/words",
  position: 6,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B074CDV13D",
      externalLink: "https://www.amazon.com/dp/B074CDV13D",
      lastSyncedAt: "2025-10-15",
    },
  ],
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
