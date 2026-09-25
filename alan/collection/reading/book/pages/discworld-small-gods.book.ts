import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const discworldSmallGods = {
  id: "019db533-f39a-7c35-b4ed-1721631e7e7c",
  type: "page-type/book",
  slug: "discworld-small-gods",
  title: "Discworld: Small Gods",
  status: "not-started",
  author: "Terry Pratchett, Ray Friesen",
  unit: "unit/words",
  position: 13,
  ownLength: 100000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000QTEA3I",
      externalLink: "https://www.amazon.com/dp/B000QTEA3I",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
