import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const milesVorsokigan = {
  id: "019db533-f39b-75b0-bc4d-ff5e26ace8ed",
  type: "page-type/book-series",
  slug: "miles-vorsokigan",
  title: "Miles Vorsokigan",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07W9LXSYG",
      externalLink: "https://www.amazon.com/dp/B07W9LXSYG",
      lastSyncedAt: "2025-10-14",
    },
  ],
  createdAt: "2026-04-22T12:39:34.043Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
