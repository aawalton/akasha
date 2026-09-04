import type { Book } from "../../book.page-type.ts"

export const chaosSeedsMonsters = {
  id: "019db533-f390-7a73-b33c-5e4debf6b1b7",
  pageTypeSlug: "book",
  slug: "chaos-seeds-monsters",
  title: "Chaos Seeds: Monsters",
  status: "completed",
  rank: "D",
  unitSlug: "words",
  position: 8,
  ownLength: 120250,
  ownProgress: 120250,
  publishedAt: "2020-01-01",
  partOfSlugs: ["book-series/chaos-seeds"],
  source: "kindle",
  externalId: "B08275CVM7",
  externalLink: "https://amazon.com/dp/B08275CVM7",
} as const satisfies Book
