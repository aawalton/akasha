import type { Book } from "../../book.page-type.ts"

export const theSystemApocalypseRebelStar = {
  id: "019db533-f391-7ba0-800b-020bf01f705f",
  pageTypeSlug: "book",
  slug: "the-system-apocalypse-rebel-star",
  title: "The System Apocalypse: Rebel Star",
  kind: "read",
  status: "completed",
  unitSlug: "words",
  position: 8,
  ownLength: 103750,
  ownProgress: 103750,
  publishedAt: "2019-12-01",
  partOfSlugs: ["book-series/the-system-apocalypse"],
  source: "kindle",
  externalId: "B07Z9N8JKM",
  externalLink: "https://amazon.com/dp/B07Z9N8JKM",
} as const satisfies Book
