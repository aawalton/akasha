import type { Book } from "../../book.page-type.ts"

export const dragonHeartWayToTheWest = {
  id: "019db533-f390-7e14-b513-4daa09e9ea7a",
  pageTypeSlug: "book",
  slug: "dragon-heart-way-to-the-west",
  title: "Dragon Heart: Way To The West",
  kind: "read",
  status: "completed",
  author: "Bible",
  unitSlug: "words",
  position: 16,
  ownLength: 106500,
  ownProgress: 106500,
  publishedAt: "2022-09-07",
  partOfSlugs: ["book-series/dragon-heart"],
  source: "kindle",
  externalId: "B0B2X3KC4D",
  externalLink: "https://amazon.com/dp/B0B2X3KC4D",
} as const satisfies Book
