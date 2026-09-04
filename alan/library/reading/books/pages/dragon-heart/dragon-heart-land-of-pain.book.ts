import type { Book } from "../../book.page-type.ts"

export const dragonHeartLandOfPain = {
  id: "019db533-f390-7e46-a7f2-179df3bfa73b",
  pageTypeSlug: "book",
  slug: "dragon-heart-land-of-pain",
  title: "Dragon Heart: Land of Pain",
  status: "completed",
  author: "Winsor McCay",
  unitSlug: "words",
  position: 9,
  ownLength: 99750,
  ownProgress: 99750,
  publishedAt: "2021-01-07",
  partOfSlugs: ["book-series/dragon-heart"],
  source: "kindle",
  externalId: "B08KY9LH1W",
  externalLink: "https://amazon.com/dp/B08KY9LH1W",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
