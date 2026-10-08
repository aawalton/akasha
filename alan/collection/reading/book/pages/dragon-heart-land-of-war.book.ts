import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const dragonHeartLandOfWar = {
  id: "019db533-f390-7e2f-a314-f739cba575fb",
  type: "page-type/book",
  slug: "dragon-heart-land-of-war",
  title: "Dragon Heart: Land of War",
  status: "completed",
  author: "SuperSummary",
  unit: "unit/words",
  position: 10,
  ownLength: 147250,
  ownProgress: 147250,
  publishedAt: "2021-03-30",
  partOfCollections: ["book-series/dragon-heart"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B08R28TZGN",
      externalLink: "https://amazon.com/dp/B08R28TZGN",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
