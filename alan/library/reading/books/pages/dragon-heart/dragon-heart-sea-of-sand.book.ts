import type { Book } from "../../book.page-type.ts"

export const dragonHeartSeaOfSand = {
  id: "019db533-f390-7e97-8d8e-d31b4345e42c",
  pageTypeSlug: "book",
  slug: "dragon-heart-sea-of-sand",
  title: "Dragon Heart: Sea of Sand",
  status: "completed",
  author: "George R. R. Martin",
  unitSlug: "words",
  position: 4,
  ownLength: 73500,
  ownProgress: 73500,
  publishedAt: "2019-12-18",
  partOfSlugs: ["book-series/dragon-heart"],
  source: "kindle",
  externalId: "B07YYMPG14",
  externalLink: "https://amazon.com/dp/B07YYMPG14",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
