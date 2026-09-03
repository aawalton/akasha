import type { Book } from "../../book.page-type.ts"

export const breakerOfHorizonsBook1 = {
  id: "019db533-f390-7a6b-9968-8495903fa30b",
  pageTypeSlug: "book",
  slug: "breaker-of-horizons-book-1",
  title: "Breaker of Horizons",
  kind: "read",
  status: "not-started",
  unitSlug: "words",
  position: 1,
  ownLength: 171000,
  publishedAt: "2022-10-18",
  partOfSlugs: ["book-series/breaker-of-horizons"],
  source: "kindle",
  externalId: "B0B5YBLPNB",
  externalLink: "https://amazon.com/dp/B0B5YBLPNB",
} as const satisfies Book
