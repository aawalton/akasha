import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const dragonHeartStoneWill = {
  id: "019db533-f390-7eaf-bc4c-5ddcda33d3aa",
  type: "page-type/book",
  slug: "dragon-heart-stone-will",
  title: "Dragon Heart: Stone Will",
  status: "completed",
  author: "Kirill Klevanski",
  unit: "unit/words",
  position: 1,
  ownLength: 104500,
  ownProgress: 104500,
  publishedAt: "2019-03-22",
  partOfCollections: ["book-series/dragon-heart"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07NKGQ7RJ",
      externalLink: "https://amazon.com/dp/B07NKGQ7RJ",
    },
  ],
} as const satisfies Book
