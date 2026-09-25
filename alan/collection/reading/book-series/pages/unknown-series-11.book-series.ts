import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const unknownSeries11 = {
  id: "019db533-f38b-7636-883d-7102a415c777",
  type: "page-type/book-series",
  slug: "unknown-series-11",
  title: "Unknown Series",
  status: "following",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CSG8NWMC",
      externalLink: "https://www.amazon.com/dp/B0CSG8NWMC",
      lastSyncedAt: "2025-11-13",
    },
  ],
} as const satisfies BookSeries
