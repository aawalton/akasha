import type { Book } from "../../book.page-type.ts"

export const dragonHeartIronWill = {
  id: "019db533-f390-7ea3-bc69-931b6f164eca",
  pageTypeSlug: "book",
  slug: "dragon-heart-iron-will",
  title: "Dragon Heart: Iron Will",
  kind: "read",
  status: "completed",
  author: "Kirill Klevanski",
  unitSlug: "words",
  position: 2,
  ownLength: 107000,
  ownProgress: 107000,
  publishedAt: "2019-09-05",
  partOfSlugs: ["book-series/dragon-heart"],
  source: "kindle",
  externalId: "B07WVXQ617",
  externalLink: "https://amazon.com/dp/B07WVXQ617",
} as const satisfies Book
