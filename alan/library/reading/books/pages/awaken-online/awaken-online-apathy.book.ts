import type { Book } from "../../book.page-type.ts"

export const awakenOnlineApathy = {
  id: "019db533-f390-787c-916f-9a3c28c1eaa9",
  pageTypeSlug: "book",
  slug: "awaken-online-apathy",
  title: "Awaken Online: Apathy",
  status: "completed",
  author: "Travis Bagwell",
  unitSlug: "words",
  position: 5,
  ownLength: 85500,
  ownProgress: 85500,
  publishedAt: "2018-07-26",
  partOfSlugs: ["book-series/awaken-online"],
  source: "kindle",
  externalId: "B07FY3Z5Z3",
  externalLink: "https://amazon.com/dp/B07FY3Z5Z3",
} as const satisfies Book
