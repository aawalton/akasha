import type { Book } from "../../book.page-type.ts"

export const awakenOnlineEvolution = {
  id: "019db533-f390-788c-b4c4-458626012440",
  pageTypeSlug: "book",
  slug: "awaken-online-evolution",
  title: "Awaken Online: Evolution",
  kind: "read",
  status: "completed",
  author: "Travis Bagwell",
  unitSlug: "words",
  position: 4,
  ownLength: 192250,
  ownProgress: 192250,
  publishedAt: "2018-05-23",
  partOfSlugs: ["book-series/awaken-online"],
  source: "kindle",
  externalId: "B07D97M5MW",
  externalLink: "https://amazon.com/dp/B07D97M5MW",
} as const satisfies Book
