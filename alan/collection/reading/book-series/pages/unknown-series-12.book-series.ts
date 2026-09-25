import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const unknownSeries12 = {
  id: "019db533-f38b-7626-a979-05a214960010",
  type: "page-type/book-series",
  slug: "unknown-series-12",
  title: "Unknown Series",
  status: "following",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0753JVZSM",
      externalLink: "https://www.amazon.com/dp/B0753JVZSM",
      lastSyncedAt: "2025-10-14",
    },
  ],
} as const satisfies BookSeries
