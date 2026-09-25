import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const harryPotter2 = {
  id: "019db533-f38b-7564-9abe-196e54480b74",
  type: "page-type/book-series",
  slug: "harry-potter-2",
  title: "Harry Potter",
  status: "completed",
  grade: "B",
  unit: "unit/words",
  position: 1,
  maturityRating: "PG-13",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B074BYZBPD",
      externalLink: "https://www.amazon.com/Harry-Potter-7-book-series/dp/B074BYZBPD",
      lastSyncedAt: "2025-10-14",
    },
  ],
} as const satisfies BookSeries
