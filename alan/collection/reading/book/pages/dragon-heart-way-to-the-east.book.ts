import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const dragonHeartWayToTheEast = {
  id: "019db533-f390-7e23-bcb7-b53f1221e9ad",
  type: "page-type/book",
  slug: "dragon-heart-way-to-the-east",
  title: "Dragon Heart: Way To The East",
  status: "completed",
  author: "Bible",
  unit: "unit/words",
  position: 17,
  ownLength: 104250,
  ownProgress: 104250,
  publishedAt: "2022-12-07",
  partOfCollections: ["book-series/dragon-heart"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BCK9YB8L",
      externalLink: "https://amazon.com/dp/B0BCK9YB8L",
    },
  ],
} as const satisfies Book
