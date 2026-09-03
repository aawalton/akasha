import type { Book } from "../../book.page-type.ts"

export const salvosWars = {
  id: "019db533-f391-75a1-a81a-551cbf445001",
  pageTypeSlug: "book",
  slug: "salvos-wars",
  title: "Salvos: Wars",
  kind: "read",
  status: "not-started",
  author: "Kimberly Brubaker Bradley",
  unitSlug: "words",
  position: 13,
  ownLength: 110250,
  publishedAt: "2024-11-15",
  partOfSlugs: ["book-series/salvos"],
  source: "kindle",
  externalId: "B0D1WNPTCC",
  externalLink: "https://amazon.com/dp/B0D1WNPTCC",
} as const satisfies Book
