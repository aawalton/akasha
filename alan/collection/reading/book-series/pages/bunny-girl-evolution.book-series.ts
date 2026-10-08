import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const bunnyGirlEvolution = {
  id: "019db533-f38b-78a7-a806-82e17b66d061",
  type: "page-type/book-series",
  slug: "bunny-girl-evolution",
  title: "Bunny Girl Evolution",
  status: "following",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0FJ6TCNWN",
      externalLink: "https://www.amazon.com/dp/B0FJ6TCNWN",
      lastSyncedAt: "2026-01-14",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
