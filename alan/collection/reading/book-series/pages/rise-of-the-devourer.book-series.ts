import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const riseOfTheDevourer = {
  id: "019db533-f38b-7986-977c-6ea90890ca15",
  type: "page-type/book-series",
  slug: "rise-of-the-devourer",
  title: "Rise of the Devourer",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CKZJHF29",
      externalLink: "https://www.amazon.com/dp/B0CKZJHF29",
      lastSyncedAt: "2025-10-14",
    },
  ],
} as const satisfies BookSeries
