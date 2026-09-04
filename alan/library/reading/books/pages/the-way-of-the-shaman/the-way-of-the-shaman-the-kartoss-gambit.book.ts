import type { Book } from "../../book.page-type.ts"

export const theWayOfTheShamanTheKartossGambit = {
  id: "019db533-f38b-75d5-8306-bb3df8ae569c",
  pageTypeSlug: "book",
  slug: "the-way-of-the-shaman-the-kartoss-gambit",
  title: "The Way of the Shaman: The Kartoss Gambit",
  kind: "read",
  status: "completed",
  author: "Vasily Mahanenko",
  unitSlug: "words",
  position: 2,
  ownLength: 128250,
  ownProgress: 128250,
  publishedAt: "2015-11-11",
  partOfSlugs: ["book-series/the-way-of-the-shaman"],
  source: "kindle",
  externalId: "B017F71H6Q",
  externalLink: "https://amazon.com/dp/B017F71H6Q",
} as const satisfies Book
