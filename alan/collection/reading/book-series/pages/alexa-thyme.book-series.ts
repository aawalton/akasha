import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const alexaThyme = {
  id: "019db533-f38b-7946-bf8c-7ece09cf1d5b",
  type: "page-type/book-series",
  slug: "alexa-thyme",
  title: "Alexa Thyme",
  status: "following",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CP5J7K9Y",
      externalLink: "https://www.amazon.com/dp/B0CP5J7K9Y",
      lastSyncedAt: "2025-10-14",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
