import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const stonehavenLeagueCitadelOfSmoke = {
  id: "019db533-f391-769e-b4b1-8067672e8dad",
  type: "page-type/book",
  slug: "stonehaven-league-citadel-of-smoke",
  title: "Stonehaven League: Citadel of Smoke",
  status: "completed",
  unit: "unit/words",
  position: 4,
  ownLength: 104500,
  ownProgress: 104500,
  publishedAt: "2018-12-04",
  partOfCollections: ["book-series/stonehaven-league"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07KWHZ69V",
      externalLink: "https://amazon.com/dp/B07KWHZ69V",
    },
  ],
} as const satisfies Book
