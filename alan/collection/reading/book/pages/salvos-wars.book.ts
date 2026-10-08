import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const salvosWars = {
  id: "019db533-f391-75a1-a81a-551cbf445001",
  type: "page-type/book",
  slug: "salvos-wars",
  title: "Salvos: Wars",
  status: "not-started",
  author: "Kimberly Brubaker Bradley",
  unit: "unit/words",
  position: 13,
  ownLength: 110250,
  publishedAt: "2024-11-15",
  partOfCollections: ["book-series/salvos"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0D1WNPTCC",
      externalLink: "https://amazon.com/dp/B0D1WNPTCC",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
