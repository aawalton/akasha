import type { Book } from "../../book.page-type.ts"

export const awakenOnlineUnity = {
  id: "019db533-f390-7873-b33d-d2c5fabb5486",
  pageTypeSlug: "book",
  slug: "awaken-online-unity",
  title: "Awaken Online: Unity",
  kind: "read",
  status: "completed",
  author: "Travis Bagwell",
  unitSlug: "words",
  position: 7,
  ownLength: 90250,
  ownProgress: 90250,
  publishedAt: "2019-06-18",
  partOfSlugs: ["book-series/awaken-online"],
  source: "kindle",
  externalId: "B07SX5B2C5",
  externalLink: "https://amazon.com/dp/B07SX5B2C5",
} as const satisfies Book
