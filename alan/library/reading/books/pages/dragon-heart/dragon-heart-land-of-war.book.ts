import type { Book } from "../../book.page-type.ts"

export const dragonHeartLandOfWar = {
  id: "019db533-f390-7e2f-a314-f739cba575fb",
  pageTypeSlug: "book",
  slug: "dragon-heart-land-of-war",
  title: "Dragon Heart: Land of War",
  kind: "read",
  status: "completed",
  author: "SuperSummary",
  unitSlug: "words",
  position: 10,
  ownLength: 147250,
  ownProgress: 147250,
  publishedAt: "2021-03-30",
  partOfSlugs: ["book-series/dragon-heart"],
  source: "kindle",
  externalId: "B08R28TZGN",
  externalLink: "https://amazon.com/dp/B08R28TZGN",
} as const satisfies Book
