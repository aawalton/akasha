import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const alien2 = {
  id: "019db533-f39b-74f8-b79e-b39edbbda933",
  type: "page-type/book-series",
  slug: "alien-2",
  title: "Alien",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B074CJPQ3X",
      externalLink: "https://www.amazon.com/dp/B074CJPQ3X",
      lastSyncedAt: "2025-10-14",
    },
  ],
} as const satisfies BookSeries
