import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const strayCatStrut = {
  id: "019db533-f38b-797d-8b60-198909f3b84f",
  type: "page-type/book-series",
  slug: "stray-cat-strut",
  title: "Stray Cat Strut",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BJD2ZL4S",
      externalLink: "https://www.amazon.com/dp/B0BJD2ZL4S",
      lastSyncedAt: "2025-10-14",
    },
  ],
} as const satisfies BookSeries
