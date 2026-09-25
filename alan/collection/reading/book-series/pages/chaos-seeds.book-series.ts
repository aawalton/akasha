import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const chaosSeeds = {
  id: "019db533-f38b-7889-b780-5cb2dc457938",
  type: "page-type/book-series",
  slug: "chaos-seeds",
  title: "Chaos Seeds",
  status: "completed",
  grade: "C",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B074C4RFZN",
      externalLink: "https://www.amazon.com/dp/B074C4RFZN",
      lastSyncedAt: "2025-10-14",
    },
  ],
} as const satisfies BookSeries
