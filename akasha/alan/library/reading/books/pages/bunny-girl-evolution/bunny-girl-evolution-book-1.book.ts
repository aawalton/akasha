import type { Book } from "../../book.page-type.ts"

export const bunnyGirlEvolutionBook1 = {
  id: "019db533-f38b-7609-8a72-1d2cdd9f4440",
  pageTypeSlug: "book",
  slug: "bunny-girl-evolution-book-1",
  title: "Bunny Girl Evolution",
  kind: "read",
  status: "completed",
  author: "Ann H. Coulter",
  unitSlug: "words",
  position: 1,
  ownLength: 157000,
  ownProgress: 157000,
  publishedAt: "2025-07-01",
  partOfSlugs: ["book-series/bunny-girl-evolution"],
  source: "kindle",
  externalId: "B0F9NR9G4D",
  externalLink: "https://amazon.com/dp/B0F9NR9G4D",
} as const satisfies Book
