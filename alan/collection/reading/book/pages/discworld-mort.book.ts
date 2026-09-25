import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const discworldMort = {
  id: "019db533-f39a-7f24-8933-d40a8d259985",
  type: "page-type/book",
  slug: "discworld-mort",
  title: "Discworld: Mort",
  status: "not-started",
  author: "Terry Pratchett",
  unit: "unit/words",
  position: 4,
  ownLength: 77250,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000W967UQ",
      externalLink: "https://www.amazon.com/dp/B000W967UQ",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
