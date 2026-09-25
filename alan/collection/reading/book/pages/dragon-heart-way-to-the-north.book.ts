import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const dragonHeartWayToTheNorth = {
  id: "019db533-f390-7ddb-a5d2-024363002a64",
  type: "page-type/book",
  slug: "dragon-heart-way-to-the-north",
  title: "Dragon Heart: Way To The North",
  status: "not-started",
  author: "Bible",
  unit: "unit/words",
  position: 19,
  ownLength: 118500,
  publishedAt: "2023-07-12",
  partOfCollections: ["book-series/dragon-heart"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BZPLKCQ2",
      externalLink: "https://amazon.com/dp/B0BZPLKCQ2",
    },
  ],
} as const satisfies Book
