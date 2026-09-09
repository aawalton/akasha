import type { Book } from "../book.page-type.ts"

export const awakenOnlineTimeless = {
  id: "019db533-f390-784b-842c-b54c3ee5fd92",
  pageTypeSlug: "book",
  type: "book",
  slug: "awaken-online-timeless",
  title: "Awaken Online: Timeless",
  status: "completed",
  author: "Travis Bagwell",
  unit: "words",
  position: 11,
  ownLength: 195250,
  ownProgress: 195250,
  publishedAt: "2023-09-01",
  partOfCollections: ["book-series/awaken-online"],
  source: "kindle",
  externalId: "B0CCFCSJPR",
  externalLink: "https://amazon.com/dp/B0CCFCSJPR",
} as const satisfies Book
