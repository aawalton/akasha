import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const robertLangdon = {
  id: "019db533-f39b-742d-a243-e8aac1de6a75",
  type: "page-type/book-series",
  slug: "robert-langdon",
  title: "Robert Langdon",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B075V6WJ9X",
      externalLink: "https://www.amazon.com/dp/B075V6WJ9X",
      lastSyncedAt: "2025-10-14",
    },
  ],
} as const satisfies BookSeries
