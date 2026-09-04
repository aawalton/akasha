import type { Book } from "../../book.page-type.ts"

export const dragonHeartWayToTheSouth = {
  id: "019db533-f390-7deb-8dee-1612bbbbd695",
  pageTypeSlug: "book",
  slug: "dragon-heart-way-to-the-south",
  title: "Dragon Heart: Way To The South",
  status: "in-progress",
  author: "Bible",
  unitSlug: "words",
  position: 18,
  ownLength: 113750,
  publishedAt: "2023-04-05",
  partOfSlugs: ["book-series/dragon-heart"],
  source: "kindle",
  externalId: "B0BNFF5J6F",
  externalLink: "https://amazon.com/dp/B0BNFF5J6F",
} as const satisfies Book
