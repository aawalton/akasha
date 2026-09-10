import type { Book } from "../book.page-type.types.ts"

export const theWayOfTheShamanClansWar = {
  id: "019db533-f38b-7574-a8be-ccf5c45e091e",
  pageTypeSlug: "book",
  type: "book",
  slug: "the-way-of-the-shaman-clans-war",
  title: "The Way of the Shaman: Clans War",
  status: "completed",
  unit: "words",
  position: 7,
  ownLength: 138750,
  ownProgress: 138750,
  publishedAt: "2018-02-12",
  partOfCollections: ["book-series/the-way-of-the-shaman"],
  source: "kindle",
  externalId: "B079N9DBB9",
  externalLink: "https://amazon.com/dp/B079N9DBB9",
} as const satisfies Book
