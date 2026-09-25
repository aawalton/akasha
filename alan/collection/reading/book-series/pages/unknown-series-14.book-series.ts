import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const unknownSeries14 = {
  id: "019db533-f38a-74c4-bee6-5992f4ee6096",
  type: "page-type/book-series",
  slug: "unknown-series-14",
  title: "Unknown Series",
  status: "following",
  grade: "C",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CTHSJYHN",
      externalLink: "https://www.amazon.com/dp/B0CTHSJYHN",
      lastSyncedAt: "2025-11-22",
    },
  ],
} as const satisfies BookSeries
