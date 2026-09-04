import type { Book } from "../../book.page-type.ts"

export const stonehavenLeagueFortressOfShadows = {
  id: "019db533-f391-76c9-89af-3a0a3735032f",
  pageTypeSlug: "book",
  slug: "stonehaven-league-fortress-of-shadows",
  title: "Stonehaven League: Fortress of Shadows",
  status: "completed",
  unitSlug: "words",
  position: 2,
  ownLength: 96000,
  ownProgress: 96000,
  publishedAt: "2018-06-16",
  partOfSlugs: ["book-series/stonehaven-league"],
  source: "kindle",
  externalId: "B07DT62F48",
  externalLink: "https://amazon.com/dp/B07DT62F48",
} as const satisfies Book
