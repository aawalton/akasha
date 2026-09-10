import type { Book } from "../book.page-type.types.ts"

export const readyPlayerOneBook1 = {
  id: "019db533-f391-7486-8319-05820d7a9f45",
  pageTypeSlug: "book",
  type: "book",
  slug: "ready-player-one-book-1",
  title: "Ready Player One",
  status: "not-started",
  author: "Ernest Cline",
  unit: "words",
  position: 1,
  ownLength: 96750,
  publishedAt: "2011-08-16",
  partOfCollections: ["book-series/ready-player-one"],
  source: "kindle",
  externalId: "B004J4WKUQ",
  externalLink: "https://amazon.com/dp/B004J4WKUQ",
} as const satisfies Book
