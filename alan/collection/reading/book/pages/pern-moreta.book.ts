import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const pernMoreta = {
  id: "019db533-f39a-7ed8-b9f7-6f8e72c386e1",
  type: "page-type/book",
  slug: "pern-moreta",
  title: "Pern: Moreta",
  status: "not-started",
  author: "Anne McCaffrey",
  unit: "unit/words",
  position: 12,
  ownLength: 96000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000FBFODW",
      externalLink: "https://www.amazon.com/dp/B000FBFODW",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
