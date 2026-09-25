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
} as const satisfies BookSeries
