import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const amelia = {
  id: "019db533-f38b-7910-ab72-d12366a6563b",
  type: "page-type/book-series",
  slug: "amelia",
  title: "Amelia",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0C6YLNM8J",
      externalLink: "https://www.amazon.com/dp/B0C6YLNM8J",
      lastSyncedAt: "2025-10-14",
    },
  ],
} as const satisfies BookSeries
