import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theWayOfTheShamanClansWar = {
  id: "019db533-f38b-7574-a8be-ccf5c45e091e",
  type: "page-type/book",
  slug: "the-way-of-the-shaman-clans-war",
  title: "The Way of the Shaman: Clans War",
  status: "completed",
  unit: "unit/words",
  position: 7,
  ownLength: 138750,
  ownProgress: 138750,
  publishedAt: "2018-02-12",
  partOfCollections: ["book-series/the-way-of-the-shaman"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B079N9DBB9",
      externalLink: "https://amazon.com/dp/B079N9DBB9",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
