import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const unknownSeries5 = {
  id: "019db533-f38b-76ca-b333-d36783504dae",
  type: "page-type/book-series",
  slug: "unknown-series-5",
  title: "Unknown Series",
  status: "following",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DJL69PHS",
      externalLink: "https://www.amazon.com/dp/B0DJL69PHS",
      lastSyncedAt: "2026-01-14",
    },
  ],
} as const satisfies BookSeries
