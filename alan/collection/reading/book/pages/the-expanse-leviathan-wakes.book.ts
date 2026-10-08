import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theExpanseLeviathanWakes = {
  id: "019db533-f39a-7eaa-a049-b1289cefda5a",
  type: "page-type/book",
  slug: "the-expanse-leviathan-wakes",
  title: "The Expanse: Leviathan Wakes",
  status: "not-started",
  author: "James S. A. Corey",
  unit: "unit/words",
  ownLength: 144250,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0047Y171G",
      externalLink: "https://www.amazon.com/dp/B0047Y171G",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
