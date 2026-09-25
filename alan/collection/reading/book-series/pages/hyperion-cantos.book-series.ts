import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const hyperionCantos = {
  id: "019db533-f39b-7510-bb6f-c764ae5a23dc",
  type: "page-type/book-series",
  slug: "hyperion-cantos",
  title: "Hyperion Cantos",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0841YH2J6",
      externalLink: "https://www.amazon.com/dp/B0841YH2J6",
      lastSyncedAt: "2025-10-14",
    },
  ],
} as const satisfies BookSeries
