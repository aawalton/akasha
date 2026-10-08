import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const disgardium = {
  id: "019db533-f38b-785c-82a6-63773961ab08",
  type: "page-type/book-series",
  slug: "disgardium",
  title: "Disgardium",
  status: "following",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07Q6M246J",
      externalLink: "https://www.amazon.com/dp/B07Q6M246J",
      lastSyncedAt: "2026-02-20",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
