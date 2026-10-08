import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theSystemApocalypseWorldUnbound = {
  id: "019db533-f391-7bb0-b66f-cbb2d0facf4e",
  type: "page-type/book",
  slug: "the-system-apocalypse-world-unbound",
  title: "The System Apocalypse: World Unbound",
  status: "completed",
  unit: "unit/words",
  position: 6,
  ownLength: 99250,
  ownProgress: 99250,
  publishedAt: "2019-01-01",
  partOfCollections: ["book-series/the-system-apocalypse"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07LF675B1",
      externalLink: "https://amazon.com/dp/B07LF675B1",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
