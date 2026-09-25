import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const theWayOfTheShaman = {
  id: "019db533-f38b-762e-85ad-acdfea72e12e",
  type: "page-type/book-series",
  slug: "the-way-of-the-shaman",
  title: "The Way of the Shaman",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B074C9P3YF",
      externalLink: "https://www.amazon.com/dp/B074C9P3YF",
      lastSyncedAt: "2025-10-14",
    },
  ],
} as const satisfies BookSeries
