import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const annalsOfDrakis = {
  id: "019db533-f39b-7590-8200-7e6d6e6e1371",
  type: "page-type/book-series",
  slug: "annals-of-drakis",
  title: "Annals of Drakis",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B074CL6K8M",
      externalLink: "https://www.amazon.com/dp/B074CL6K8M",
      lastSyncedAt: "2025-10-14",
    },
  ],
  createdAt: "2026-04-22T12:39:34.043Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
