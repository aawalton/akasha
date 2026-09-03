import type { Book } from "../../book.page-type.ts"

export const theGam3EarthsGambit = {
  id: "019db533-f391-78f5-a799-ead760aff5f9",
  pageTypeSlug: "book",
  slug: "the-gam3-earths-gambit",
  title: "The Gam3: Earth's Gambit",
  kind: "read",
  status: "completed",
  author: "Cosimo Yap",
  unitSlug: "words",
  position: 2,
  ownLength: 102250,
  ownProgress: 102250,
  publishedAt: "2017-08-15",
  partOfSlugs: ["book-series/the-gam3"],
  source: "kindle",
  externalId: "B074R284RB",
  externalLink: "https://amazon.com/dp/B074R284RB",
} as const satisfies Book
