import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const awakenOnline = {
  id: "019db533-f38b-78ff-9dd1-e96e43463aeb",
  type: "page-type/book-series",
  slug: "awaken-online",
  title: "Awaken Online",
  status: "following",
  grade: "A",
  unit: "unit/words",
  maturityRating: "R",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B074CC5NDX",
      externalLink: "https://www.amazon.com/dp/B074CC5NDX",
      lastSyncedAt: "2026-03-23",
    },
  ],
} as const satisfies BookSeries
