import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const bushidoOnline = {
  id: "019db533-f38b-78cd-9faa-f55184ae233a",
  type: "page-type/book-series",
  slug: "bushido-online",
  title: "Bushido Online",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07959MGTF",
      externalLink: "https://www.amazon.com/dp/B07959MGTF",
      lastSyncedAt: "2025-10-14",
    },
  ],
} as const satisfies BookSeries
