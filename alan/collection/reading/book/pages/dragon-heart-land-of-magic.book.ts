import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const dragonHeartLandOfMagic = {
  id: "019db533-f390-7e74-b90a-40b24713fdd5",
  type: "page-type/book",
  slug: "dragon-heart-land-of-magic",
  title: "Dragon Heart: Land of Magic",
  status: "completed",
  author: "Nick Roberts, Greg Kramer",
  unit: "unit/words",
  position: 6,
  ownLength: 147750,
  ownProgress: 147750,
  publishedAt: "2020-05-28",
  partOfCollections: ["book-series/dragon-heart"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B085F2WSKD",
      externalLink: "https://amazon.com/dp/B085F2WSKD",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
