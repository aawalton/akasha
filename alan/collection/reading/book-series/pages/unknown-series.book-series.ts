import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const unknownSeries = {
  id: "019db533-f39d-7db9-9583-848792160ec7",
  type: "page-type/book-series",
  slug: "unknown-series",
  title: "Unknown Series",
  status: "following",
  grade: "A",
  unit: "unit/words",
  position: 2,
  maturityRating: "PG",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B077LJWQGP",
      externalLink: "https://www.amazon.com/dp/B077LJWQGP",
      lastSyncedAt: "2025-10-15",
    },
  ],
} as const satisfies BookSeries
