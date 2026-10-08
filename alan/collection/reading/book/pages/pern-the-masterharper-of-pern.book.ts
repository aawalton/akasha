import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const pernTheMasterharperOfPern = {
  id: "019db533-f39a-7953-aa28-9f1e563dca25",
  type: "page-type/book",
  slug: "pern-the-masterharper-of-pern",
  title: "Pern: The Masterharper of Pern",
  status: "not-started",
  author: "Anne McCaffrey",
  unit: "unit/words",
  position: 14,
  ownLength: 108000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000FBFOSC",
      externalLink: "https://www.amazon.com/dp/B000FBFOSC",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
