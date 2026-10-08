import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const robertLangdonOrigin = {
  id: "019db533-f39a-7dc9-9ab7-ee61bff9daa5",
  type: "page-type/book",
  slug: "robert-langdon-origin",
  title: "Robert Langdon: Origin",
  status: "not-started",
  author: "Dan Brown",
  unit: "unit/words",
  position: 4,
  ownLength: 115750,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B01LY7FD0D",
      externalLink: "https://www.amazon.com/dp/B01LY7FD0D",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
