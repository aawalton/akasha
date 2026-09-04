import type { Book } from "../../book.page-type.ts"

export const awakenOnlineDominion = {
  id: "019db533-f390-786b-bef3-240fe6d8bbb9",
  pageTypeSlug: "book",
  slug: "awaken-online-dominion",
  title: "Awaken Online: Dominion",
  status: "completed",
  author: "Travis Bagwell",
  unitSlug: "words",
  position: 6,
  ownLength: 200250,
  ownProgress: 200250,
  publishedAt: "2019-02-26",
  partOfSlugs: ["book-series/awaken-online"],
  source: "kindle",
  externalId: "B07PB6NDPX",
  externalLink: "https://amazon.com/dp/B07PB6NDPX",
} as const satisfies Book
