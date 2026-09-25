import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theGam3SacrificialPieces = {
  id: "019db533-f391-78ec-ab72-ea7b7b261162",
  type: "page-type/book",
  slug: "the-gam3-sacrificial-pieces",
  title: "The Gam3: Sacrificial Pieces",
  status: "completed",
  author: "Cosimo Yap",
  unit: "unit/words",
  position: 3,
  ownLength: 69500,
  ownProgress: 69500,
  publishedAt: "2019-02-07",
  partOfCollections: ["book-series/the-gam3"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07NJ7381N",
      externalLink: "https://amazon.com/dp/B07NJ7381N",
    },
  ],
} as const satisfies Book
