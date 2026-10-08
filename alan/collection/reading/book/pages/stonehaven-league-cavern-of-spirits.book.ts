import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const stonehavenLeagueCavernOfSpirits = {
  id: "019db533-f391-76c0-ba8c-15ae84ecbc14",
  type: "page-type/book",
  slug: "stonehaven-league-cavern-of-spirits",
  title: "Stonehaven League: Cavern of Spirits",
  status: "completed",
  unit: "unit/words",
  position: 3,
  ownLength: 99000,
  ownProgress: 99000,
  publishedAt: "2018-09-20",
  partOfCollections: ["book-series/stonehaven-league"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07HB6L6X9",
      externalLink: "https://amazon.com/dp/B07HB6L6X9",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
