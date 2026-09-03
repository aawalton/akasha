import type { Book } from "../../book.page-type.ts"

export const awakenOnlineCatharsis = {
  id: "019db533-f390-7894-b5c3-baeacc23d22f",
  pageTypeSlug: "book",
  slug: "awaken-online-catharsis",
  title: "Awaken Online: Catharsis",
  kind: "read",
  status: "completed",
  author: "Travis Bagwell",
  unitSlug: "words",
  position: 1,
  ownLength: 131750,
  ownProgress: 131750,
  publishedAt: "2016-07-23",
  partOfSlugs: ["book-series/awaken-online"],
  source: "kindle",
  externalId: "B01J0E8Z8A",
  externalLink: "https://amazon.com/dp/B01J0E8Z8A",
} as const satisfies Book
