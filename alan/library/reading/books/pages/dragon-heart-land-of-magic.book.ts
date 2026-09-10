import type { Book } from "../book.page-type.types.ts"

export const dragonHeartLandOfMagic = {
  id: "019db533-f390-7e74-b90a-40b24713fdd5",
  pageTypeSlug: "book",
  type: "book",
  slug: "dragon-heart-land-of-magic",
  title: "Dragon Heart: Land of Magic",
  status: "completed",
  author: "Nick Roberts, Greg Kramer",
  unit: "words",
  position: 6,
  ownLength: 147750,
  ownProgress: 147750,
  publishedAt: "2020-05-28",
  partOfCollections: ["book-series/dragon-heart"],
  source: "kindle",
  externalId: "B085F2WSKD",
  externalLink: "https://amazon.com/dp/B085F2WSKD",
} as const satisfies Book
