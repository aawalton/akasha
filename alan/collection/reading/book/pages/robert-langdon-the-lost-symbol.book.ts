import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const robertLangdonTheLostSymbol = {
  id: "019db533-f39a-799b-a8cd-c9d4ec71981f",
  type: "page-type/book",
  slug: "robert-langdon-the-lost-symbol",
  title: "Robert Langdon: The Lost Symbol",
  status: "not-started",
  author: "Dan Brown",
  unit: "unit/words",
  position: 2,
  ownLength: 164500,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B002KQ6BT6",
      externalLink: "https://www.amazon.com/dp/B002KQ6BT6",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
