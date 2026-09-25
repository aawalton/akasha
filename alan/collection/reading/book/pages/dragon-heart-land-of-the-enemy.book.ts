import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const dragonHeartLandOfTheEnemy = {
  id: "019db533-f390-7e68-9059-2c0987440388",
  type: "page-type/book",
  slug: "dragon-heart-land-of-the-enemy",
  title: "Dragon Heart: Land of The Enemy",
  status: "completed",
  unit: "unit/words",
  position: 8,
  ownLength: 90750,
  ownProgress: 90750,
  publishedAt: "2020-10-22",
  partOfCollections: ["book-series/dragon-heart"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B08F291JJS",
      externalLink: "https://amazon.com/dp/B08F291JJS",
    },
  ],
} as const satisfies Book
