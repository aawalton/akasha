import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const beastborne = {
  id: "019db533-f38b-78f8-8852-ba4f955f0650",
  type: "page-type/book-series",
  slug: "beastborne",
  title: "Beastborne",
  status: "following",
  grade: "B",
  unit: "unit/words",
  maturityRating: "R",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CHR81MLP",
      externalLink: "https://www.amazon.com/dp/B0CHR81MLP",
      lastSyncedAt: "2025-10-14",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
