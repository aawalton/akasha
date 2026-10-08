import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const theJourneyToTheWestSeries = {
  id: "019db533-f388-7d42-ab1e-606c772470a0",
  type: "page-type/book-series",
  slug: "the-journey-to-the-west-series",
  title: "The Journey to the West Series",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B087G3G8GT",
      externalLink: "https://www.amazon.com/dp/B087G3G8GT",
      lastSyncedAt: "2025-12-17",
    },
  ],
  createdAt: "2026-04-22T12:39:34.024Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
