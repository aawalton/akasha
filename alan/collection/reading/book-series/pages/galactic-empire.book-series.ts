import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const galacticEmpire = {
  id: "019db533-f39b-75a8-a0d5-4e840f3e3ed9",
  type: "page-type/book-series",
  slug: "galactic-empire",
  title: "Galactic Empire",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B08972D26X",
      externalLink: "https://www.amazon.com/dp/B08972D26X",
      lastSyncedAt: "2025-10-14",
    },
  ],
} as const satisfies BookSeries
