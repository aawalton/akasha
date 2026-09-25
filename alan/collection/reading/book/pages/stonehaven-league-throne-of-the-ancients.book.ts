import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const stonehavenLeagueThroneOfTheAncients = {
  id: "019db533-f391-7696-bfcd-a9e7904108e5",
  type: "page-type/book",
  slug: "stonehaven-league-throne-of-the-ancients",
  title: "Stonehaven League: Throne of the Ancients",
  status: "completed",
  unit: "unit/words",
  position: 6,
  ownLength: 87500,
  ownProgress: 87500,
  publishedAt: "2019-08-13",
  partOfCollections: ["book-series/stonehaven-league"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07W584LKQ",
      externalLink: "https://amazon.com/dp/B07W584LKQ",
    },
  ],
} as const satisfies Book
