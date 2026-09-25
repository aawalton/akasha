import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const dragonHeartWayToTheSouth = {
  id: "019db533-f390-7deb-8dee-1612bbbbd695",
  type: "page-type/book",
  slug: "dragon-heart-way-to-the-south",
  title: "Dragon Heart: Way To The South",
  status: "in-progress",
  author: "Bible",
  unit: "unit/words",
  position: 18,
  ownLength: 113750,
  publishedAt: "2023-04-05",
  partOfCollections: ["book-series/dragon-heart"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BNFF5J6F",
      externalLink: "https://amazon.com/dp/B0BNFF5J6F",
    },
  ],
} as const satisfies Book
