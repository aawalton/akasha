import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const furySeries = {
  id: "019db533-f39b-7518-a153-ba3dfb50f654",
  type: "page-type/book-series",
  slug: "fury-series",
  title: "Fury Series",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B084WWLBYJ",
      externalLink: "https://www.amazon.com/dp/B084WWLBYJ",
      lastSyncedAt: "2025-10-14",
    },
  ],
} as const satisfies BookSeries
