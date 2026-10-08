import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const pernTheChroniclesOfPernFirstFall = {
  id: "019db533-f39a-7b88-bc3f-c427a2602543",
  type: "page-type/book",
  slug: "pern-the-chronicles-of-pern-first-fall",
  title: "Pern: The Chronicles of Pern: First Fall",
  status: "not-started",
  author: "Anne McCaffrey",
  unit: "unit/words",
  position: 2,
  ownLength: 84000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000FBFOPK",
      externalLink: "https://www.amazon.com/dp/B000FBFOPK",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
