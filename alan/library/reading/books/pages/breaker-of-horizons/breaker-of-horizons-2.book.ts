import type { Book } from "../../book.page-type.ts"

export const breakerOfHorizons2 = {
  id: "019db533-f390-7a2d-950f-3dca2e1a322e",
  pageTypeSlug: "book",
  slug: "breaker-of-horizons-2",
  title: "Breaker of Horizons 2",
  kind: "read",
  status: "not-started",
  unitSlug: "words",
  position: 2,
  ownLength: 112500,
  publishedAt: "2023-01-17",
  partOfSlugs: ["book-series/breaker-of-horizons"],
  source: "kindle",
  externalId: "B0BJ52R54D",
  externalLink: "https://amazon.com/dp/B0BJ52R54D",
} as const satisfies Book
