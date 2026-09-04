import type { Book } from "../../book.page-type.ts"

export const awakenOnlineHappy = {
  id: "019db533-f390-785b-9f21-e886031fd622",
  pageTypeSlug: "book",
  slug: "awaken-online-happy",
  title: "Awaken Online: Happy",
  kind: "read",
  status: "completed",
  unitSlug: "words",
  position: 9,
  ownLength: 187250,
  ownProgress: 187250,
  publishedAt: "2021-12-07",
  partOfSlugs: ["book-series/awaken-online"],
  source: "kindle",
  externalId: "B09KYD8JMT",
  externalLink: "https://amazon.com/dp/B09KYD8JMT",
} as const satisfies Book
