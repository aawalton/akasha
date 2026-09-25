import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const stonehavenLeagueTempleOfSorrow = {
  id: "019db533-f391-76a5-9bce-74cb744858cd",
  type: "page-type/book",
  slug: "stonehaven-league-temple-of-sorrow",
  title: "Stonehaven League: Temple of Sorrow",
  status: "completed",
  unit: "unit/words",
  position: 1,
  ownLength: 95500,
  ownProgress: 95500,
  publishedAt: "2018-04-24",
  partOfCollections: ["book-series/stonehaven-league"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07CJPX61L",
      externalLink: "https://amazon.com/dp/B07CJPX61L",
    },
  ],
} as const satisfies Book
