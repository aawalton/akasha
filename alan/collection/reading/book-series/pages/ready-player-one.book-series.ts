import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const readyPlayerOne = {
  id: "019db533-f38b-77ad-8d2b-4fb5a7d9c86d",
  type: "page-type/book-series",
  slug: "ready-player-one",
  title: "Ready Player One",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B083977FTN",
      externalLink: "https://www.amazon.com/dp/B083977FTN",
      lastSyncedAt: "2025-10-14",
    },
  ],
} as const satisfies BookSeries
