import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const theElderEmpireShadow = {
  id: "019db533-f39b-7435-b5cb-f63a0eb674c0",
  type: "page-type/book-series",
  slug: "the-elder-empire-shadow",
  title: "The Elder Empire - Shadow",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B074CCVM2J",
      externalLink: "https://www.amazon.com/dp/B074CCVM2J",
      lastSyncedAt: "2025-10-14",
    },
  ],
  createdAt: "2026-04-22T12:39:34.043Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
