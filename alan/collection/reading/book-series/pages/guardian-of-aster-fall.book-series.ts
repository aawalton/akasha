import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const guardianOfAsterFall = {
  id: "019db533-f38b-7854-9f97-eac6af7a6bb4",
  type: "page-type/book-series",
  slug: "guardian-of-aster-fall",
  title: "Guardian of Aster Fall",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B09HJCYHT3",
      externalLink: "https://www.amazon.com/dp/B09HJCYHT3",
      lastSyncedAt: "2025-10-14",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
