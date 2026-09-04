import type { Book } from "../../book.page-type.ts"

export const chaosSeedsCatacombs = {
  id: "019db533-f390-7a94-ae90-a246f436d905",
  pageTypeSlug: "book",
  slug: "chaos-seeds-catacombs",
  title: "Chaos Seeds: Catacombs",
  status: "completed",
  rank: "C",
  unitSlug: "words",
  position: 4,
  ownLength: 92000,
  ownProgress: 92000,
  publishedAt: "2016-06-03",
  partOfSlugs: ["book-series/chaos-seeds"],
  source: "kindle",
  externalId: "B01GLSCUM0",
  externalLink: "https://amazon.com/dp/B01GLSCUM0",
} as const satisfies Book
