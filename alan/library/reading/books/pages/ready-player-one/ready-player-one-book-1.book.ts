import type { Book } from "../../book.page-type.ts"

export const readyPlayerOneBook1 = {
  id: "019db533-f391-7486-8319-05820d7a9f45",
  pageTypeSlug: "book",
  slug: "ready-player-one-book-1",
  title: "Ready Player One",
  status: "not-started",
  author: "Ernest Cline",
  unitSlug: "words",
  position: 1,
  ownLength: 96750,
  publishedAt: "2011-08-16",
  partOfSlugs: ["book-series/ready-player-one"],
  source: "kindle",
  externalId: "B004J4WKUQ",
  externalLink: "https://amazon.com/dp/B004J4WKUQ",
} as const satisfies Book
