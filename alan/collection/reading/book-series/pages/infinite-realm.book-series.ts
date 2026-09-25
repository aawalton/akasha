import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const infiniteRealm = {
  id: "019db533-f38b-7648-bd0d-93e7b70f60c6",
  type: "page-type/book-series",
  slug: "infinite-realm",
  title: "Infinite Realm",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B08SCFZWP5",
      externalLink: "https://www.amazon.com/dp/B08SCFZWP5",
      lastSyncedAt: "2025-10-14",
    },
  ],
} as const satisfies BookSeries
