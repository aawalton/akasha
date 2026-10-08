import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const breakerOfHorizons2 = {
  id: "019db533-f390-7a2d-950f-3dca2e1a322e",
  type: "page-type/book",
  slug: "breaker-of-horizons-2",
  title: "Breaker of Horizons 2",
  status: "not-started",
  unit: "unit/words",
  position: 2,
  ownLength: 112500,
  publishedAt: "2023-01-17",
  partOfCollections: ["book-series/breaker-of-horizons"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BJ52R54D",
      externalLink: "https://amazon.com/dp/B0BJ52R54D",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
