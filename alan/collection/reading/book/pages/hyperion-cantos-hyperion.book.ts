import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const hyperionCantosHyperion = {
  id: "019db533-f39b-7016-9e48-ce6e588f4478",
  type: "page-type/book",
  slug: "hyperion-cantos-hyperion",
  title: "Hyperion Cantos: Hyperion",
  status: "not-started",
  author: "Dan Simmons",
  unit: "unit/words",
  ownLength: 120750,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B004G60EHS",
      externalLink: "https://www.amazon.com/dp/B004G60EHS",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.043Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
