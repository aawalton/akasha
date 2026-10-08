import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const dragonHeartWayToTheWest = {
  id: "019db533-f390-7e14-b513-4daa09e9ea7a",
  type: "page-type/book",
  slug: "dragon-heart-way-to-the-west",
  title: "Dragon Heart: Way To The West",
  status: "completed",
  author: "Bible",
  unit: "unit/words",
  position: 16,
  ownLength: 106500,
  ownProgress: 106500,
  publishedAt: "2022-09-07",
  partOfCollections: ["book-series/dragon-heart"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0B2X3KC4D",
      externalLink: "https://amazon.com/dp/B0B2X3KC4D",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
