import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const sylOsmosis = {
  id: "019db533-f391-7722-9b5c-bbdc8bb2c3e4",
  type: "page-type/book",
  slug: "syl-osmosis",
  title: "Syl: Osmosis",
  status: "completed",
  author: "Lunadea",
  unit: "unit/words",
  position: 2,
  ownLength: 137500,
  ownProgress: 137500,
  publishedAt: "2025-04-07",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DWLMGRHQ",
      externalLink: "https://amazon.com/dp/B0DWLMGRHQ",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
