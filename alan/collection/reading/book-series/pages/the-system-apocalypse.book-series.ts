import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const theSystemApocalypse = {
  id: "019db533-f38b-7659-8821-3f8e2dccf68a",
  type: "page-type/book-series",
  slug: "the-system-apocalypse",
  title: "The System Apocalypse",
  status: "completed",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B077LNLSZ7",
      externalLink: "https://www.amazon.com/dp/B077LNLSZ7",
      lastSyncedAt: "2025-10-14",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
