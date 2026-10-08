import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const pernTheRenegadesOfPern = {
  id: "019db533-f39a-79e4-b0d2-dfb6dab03b82",
  type: "page-type/book",
  slug: "pern-the-renegades-of-pern",
  title: "Pern: The Renegades of Pern",
  status: "not-started",
  author: "Anne McCaffrey",
  unit: "unit/words",
  position: 21,
  ownLength: 88000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000FBFOK0",
      externalLink: "https://www.amazon.com/dp/B000FBFOK0",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
