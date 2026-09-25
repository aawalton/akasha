import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const theGam3 = {
  id: "019db533-f38b-7686-bdfb-c629e7b5b1c1",
  type: "page-type/book-series",
  slug: "the-gam3",
  title: "The Gam3",
  status: "completed",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B075V2GXKP",
      externalLink: "https://www.amazon.com/dp/B075V2GXKP",
      lastSyncedAt: "2025-10-14",
    },
  ],
} as const satisfies BookSeries
