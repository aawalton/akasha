import type { Book } from "../../book.page-type.ts"

export const cradleWintersteel = {
  id: "019db533-f390-7c00-bcf8-2134d6b08e30",
  pageTypeSlug: "book",
  slug: "cradle-wintersteel",
  title: "Cradle: Wintersteel",
  status: "completed",
  author: "Will Wight",
  unitSlug: "words",
  position: 8,
  ownLength: 130500,
  ownProgress: 130500,
  publishedAt: "2020-10-06",
  partOfSlugs: ["book-series/cradle"],
  source: "kindle",
  externalId: "B08JMF22F2",
  externalLink: "https://amazon.com/dp/B08JMF22F2",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
