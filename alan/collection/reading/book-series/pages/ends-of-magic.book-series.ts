import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const endsOfMagic = {
  id: "019db533-f38b-784c-b6c1-352ee7a84bfa",
  type: "page-type/book-series",
  slug: "ends-of-magic",
  title: "Ends of Magic",
  status: "following",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CJCNP2FV",
      externalLink: "https://www.amazon.com/dp/B0CJCNP2FV",
      lastSyncedAt: "2025-10-14",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
