import type { Book } from "../../book.page-type.ts"

export const theGam3SacrificialPieces = {
  id: "019db533-f391-78ec-ab72-ea7b7b261162",
  pageTypeSlug: "book",
  slug: "the-gam3-sacrificial-pieces",
  title: "The Gam3: Sacrificial Pieces",
  status: "completed",
  author: "Cosimo Yap",
  unitSlug: "words",
  position: 3,
  ownLength: 69500,
  ownProgress: 69500,
  publishedAt: "2019-02-07",
  partOfSlugs: ["book-series/the-gam3"],
  source: "kindle",
  externalId: "B07NJ7381N",
  externalLink: "https://amazon.com/dp/B07NJ7381N",
} as const satisfies Book
