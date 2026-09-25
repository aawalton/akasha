import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const darkMatterAscension = {
  id: "019db533-f38b-7892-8caf-1c9cd5f962f6",
  type: "page-type/book-series",
  slug: "dark-matter-ascension",
  title: "Dark Matter Ascension",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0F4M11Y85",
      externalLink: "https://www.amazon.com/dp/B0F4M11Y85",
      lastSyncedAt: "2025-10-14",
    },
  ],
} as const satisfies BookSeries
