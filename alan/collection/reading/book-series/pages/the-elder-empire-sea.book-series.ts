import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const theElderEmpireSea = {
  id: "019db533-f39b-7477-8d02-08741669d97c",
  type: "page-type/book-series",
  slug: "the-elder-empire-sea",
  title: "The Elder Empire - Sea",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B074C78XPJ",
      externalLink: "https://www.amazon.com/dp/B074C78XPJ",
      lastSyncedAt: "2025-10-14",
    },
  ],
} as const satisfies BookSeries
