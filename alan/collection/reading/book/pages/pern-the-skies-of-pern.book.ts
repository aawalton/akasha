import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const pernTheSkiesOfPern = {
  id: "019db533-f39a-7a27-96d7-44effca30f4e",
  type: "page-type/book",
  slug: "pern-the-skies-of-pern",
  title: "Pern: The Skies of Pern",
  status: "not-started",
  author: "Anne McCaffrey",
  unit: "unit/words",
  position: 24,
  ownLength: 120000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000FC1KGQ",
      externalLink: "https://www.amazon.com/dp/B000FC1KGQ",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
