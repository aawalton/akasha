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
} as const satisfies Book
