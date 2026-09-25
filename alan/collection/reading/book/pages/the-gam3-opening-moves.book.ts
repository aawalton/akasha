import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theGam3OpeningMoves = {
  id: "019db533-f391-7905-abea-9a9096308eea",
  type: "page-type/book",
  slug: "the-gam3-opening-moves",
  title: "The Gam3: Opening Moves",
  status: "completed",
  author: "Cosimo Yap",
  unit: "unit/words",
  position: 1,
  ownLength: 110750,
  ownProgress: 110750,
  publishedAt: "2016-03-23",
  partOfCollections: ["book-series/the-gam3"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B01DFCNAPG",
      externalLink: "https://amazon.com/dp/B01DFCNAPG",
    },
  ],
} as const satisfies Book
