import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const vorkosiganSagaWeatherman = {
  id: "019db533-f39a-7803-b87d-5180728e5a09",
  type: "page-type/book",
  slug: "vorkosigan-saga-weatherman",
  title: "Vorkosigan Saga: Weatherman",
  status: "not-started",
  unit: "unit/words",
  position: 2,
  ownLength: 27250,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B004U7LWQK",
      externalLink: "https://www.amazon.com/dp/B004U7LWQK",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
