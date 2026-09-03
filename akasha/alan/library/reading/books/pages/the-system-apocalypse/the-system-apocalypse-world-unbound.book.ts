import type { Book } from "../../book.page-type.ts"

export const theSystemApocalypseWorldUnbound = {
  id: "019db533-f391-7bb0-b66f-cbb2d0facf4e",
  pageTypeSlug: "book",
  slug: "the-system-apocalypse-world-unbound",
  title: "The System Apocalypse: World Unbound",
  kind: "read",
  status: "completed",
  unitSlug: "words",
  position: 6,
  ownLength: 99250,
  ownProgress: 99250,
  publishedAt: "2019-01-01",
  partOfSlugs: ["book-series/the-system-apocalypse"],
  source: "kindle",
  externalId: "B07LF675B1",
  externalLink: "https://amazon.com/dp/B07LF675B1",
} as const satisfies Book
