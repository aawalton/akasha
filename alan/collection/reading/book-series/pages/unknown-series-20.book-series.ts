import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const unknownSeries20 = {
  id: "019db533-f38a-7380-8a82-4b8d486449d4",
  type: "page-type/book-series",
  slug: "unknown-series-20",
  title: "Unknown Series",
  status: "following",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07SHW8NRV",
      externalLink: "https://www.amazon.com/The-Alchemic-Weaponeer/dp/B07SHW8NRV",
      lastSyncedAt: "2025-11-22",
    },
  ],
} as const satisfies BookSeries
