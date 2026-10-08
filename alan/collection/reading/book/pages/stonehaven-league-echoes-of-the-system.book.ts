import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const stonehavenLeagueEchoesOfTheSystem = {
  id: "019db533-f391-7687-9d61-b85a7d270f19",
  type: "page-type/book",
  slug: "stonehaven-league-echoes-of-the-system",
  title: "Stonehaven League: Echoes of the System",
  status: "completed",
  unit: "unit/words",
  position: 7,
  ownLength: 68250,
  ownProgress: 68250,
  publishedAt: "2019-12-24",
  partOfCollections: ["book-series/stonehaven-league"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B082RH3RP7",
      externalLink: "https://amazon.com/dp/B082RH3RP7",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
