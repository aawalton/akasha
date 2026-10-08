import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const breakerOfHorizonsBook1 = {
  id: "019db533-f390-7a6b-9968-8495903fa30b",
  type: "page-type/book",
  slug: "breaker-of-horizons-book-1",
  title: "Breaker of Horizons",
  status: "not-started",
  unit: "unit/words",
  position: 1,
  ownLength: 171000,
  publishedAt: "2022-10-18",
  partOfCollections: ["book-series/breaker-of-horizons"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0B5YBLPNB",
      externalLink: "https://amazon.com/dp/B0B5YBLPNB",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
