import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const mistborn = {
  id: "019db533-f39d-7422-a08e-39b5db2ef4d2",
  type: "page-type/book-series",
  slug: "mistborn",
  title: "Mistborn",
  status: "paused",
  unit: "unit/words",
  position: 1,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0B4N71QWS",
      externalLink: "https://www.amazon.com/dp/B0B4N71QWS",
      lastSyncedAt: "2025-10-15",
    },
  ],
} as const satisfies BookSeries
