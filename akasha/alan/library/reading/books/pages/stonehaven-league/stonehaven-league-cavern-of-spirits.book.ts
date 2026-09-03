import type { Book } from "../../book.page-type.ts"

export const stonehavenLeagueCavernOfSpirits = {
  id: "019db533-f391-76c0-ba8c-15ae84ecbc14",
  pageTypeSlug: "book",
  slug: "stonehaven-league-cavern-of-spirits",
  title: "Stonehaven League: Cavern of Spirits",
  kind: "read",
  status: "completed",
  unitSlug: "words",
  position: 3,
  ownLength: 99000,
  ownProgress: 99000,
  publishedAt: "2018-09-20",
  partOfSlugs: ["book-series/stonehaven-league"],
  source: "kindle",
  externalId: "B07HB6L6X9",
  externalLink: "https://amazon.com/dp/B07HB6L6X9",
} as const satisfies Book
