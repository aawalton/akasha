import type { Book } from "../../book.page-type.ts"

export const theWayOfTheShamanThePhantomCastle = {
  id: "019db533-f38b-75c9-9690-0a0da43d5e69",
  pageTypeSlug: "book",
  slug: "the-way-of-the-shaman-the-phantom-castle",
  title: "The Way of the Shaman: The Phantom Castle",
  kind: "read",
  status: "completed",
  author: "Vasily Mahanenko",
  unitSlug: "words",
  position: 4,
  ownLength: 148250,
  ownProgress: 148250,
  publishedAt: "2016-11-28",
  partOfSlugs: ["book-series/the-way-of-the-shaman"],
  source: "kindle",
  externalId: "B01M8JW7DQ",
  externalLink: "https://amazon.com/dp/B01M8JW7DQ",
} as const satisfies Book
