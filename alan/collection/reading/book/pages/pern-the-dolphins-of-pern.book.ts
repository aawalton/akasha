import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const pernTheDolphinsOfPern = {
  id: "019db533-f39a-7af1-9169-da9884e9f83e",
  type: "page-type/book",
  slug: "pern-the-dolphins-of-pern",
  title: "Pern: The Dolphins of Pern",
  status: "not-started",
  author: "Anne McCaffrey",
  unit: "unit/words",
  position: 23,
  ownLength: 96000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000FBFOQ4",
      externalLink: "https://www.amazon.com/dp/B000FBFOQ4",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
