import type { Book } from "../../book.page-type.ts"

export const dragonHeartLandOfTheEnemy = {
  id: "019db533-f390-7e68-9059-2c0987440388",
  pageTypeSlug: "book",
  slug: "dragon-heart-land-of-the-enemy",
  title: "Dragon Heart: Land of The Enemy",
  kind: "read",
  status: "completed",
  unitSlug: "words",
  position: 8,
  ownLength: 90750,
  ownProgress: 90750,
  publishedAt: "2020-10-22",
  partOfSlugs: ["book-series/dragon-heart"],
  source: "kindle",
  externalId: "B08F291JJS",
  externalLink: "https://amazon.com/dp/B08F291JJS",
} as const satisfies Book
