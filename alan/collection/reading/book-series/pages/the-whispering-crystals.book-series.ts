import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const theWhisperingCrystals = {
  id: "019db533-f38b-7615-9a2f-8c5d1411cd0c",
  type: "page-type/book-series",
  slug: "the-whispering-crystals",
  title: "The Whispering Crystals",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B08MTFM6S5",
      externalLink: "https://www.amazon.com/dp/B08MTFM6S5",
      lastSyncedAt: "2025-10-14",
    },
  ],
} as const satisfies BookSeries
