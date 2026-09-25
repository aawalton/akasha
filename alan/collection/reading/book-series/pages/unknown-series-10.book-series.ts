import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const unknownSeries10 = {
  id: "019db533-f38b-7651-9456-21559fe48211",
  type: "page-type/book-series",
  slug: "unknown-series-10",
  title: "Unknown Series",
  status: "following",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0D6X3JQ61",
      externalLink: "https://www.amazon.com/dp/B0D6X3JQ61",
      lastSyncedAt: "2025-10-14",
    },
  ],
} as const satisfies BookSeries
