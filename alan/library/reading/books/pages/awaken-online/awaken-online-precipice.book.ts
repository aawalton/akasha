import type { Book } from "../../book.page-type.ts"

export const awakenOnlinePrecipice = {
  id: "019db533-f390-7884-a525-403ccd8912cc",
  pageTypeSlug: "book",
  slug: "awaken-online-precipice",
  title: "Awaken Online: Precipice",
  status: "completed",
  author: "Travis Bagwell",
  unitSlug: "words",
  position: 2,
  ownLength: 149000,
  ownProgress: 149000,
  publishedAt: "2017-03-26",
  partOfSlugs: ["book-series/awaken-online"],
  source: "kindle",
  externalId: "B01N5NPTUS",
  externalLink: "https://amazon.com/dp/B01N5NPTUS",
} as const satisfies Book
