import type { Book } from "../../book.page-type.ts"

export const dragonHeartStoneWill = {
  id: "019db533-f390-7eaf-bc4c-5ddcda33d3aa",
  pageTypeSlug: "book",
  slug: "dragon-heart-stone-will",
  title: "Dragon Heart: Stone Will",
  status: "completed",
  author: "Kirill Klevanski",
  unitSlug: "words",
  position: 1,
  ownLength: 104500,
  ownProgress: 104500,
  publishedAt: "2019-03-22",
  partOfSlugs: ["book-series/dragon-heart"],
  source: "kindle",
  externalId: "B07NKGQ7RJ",
  externalLink: "https://amazon.com/dp/B07NKGQ7RJ",
} as const satisfies Book
