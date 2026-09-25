import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theWayOfTheShamanShamansRevenge = {
  id: "019db533-f38b-75c1-b4db-bb9a4beffcf9",
  type: "page-type/book",
  slug: "the-way-of-the-shaman-shamans-revenge",
  title: "The Way of the Shaman: Shaman's Revenge",
  status: "completed",
  unit: "unit/words",
  position: 6,
  ownLength: 140250,
  ownProgress: 140250,
  publishedAt: "2017-08-20",
  partOfCollections: ["book-series/the-way-of-the-shaman"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B074V8YB1M",
      externalLink: "https://amazon.com/dp/B074V8YB1M",
    },
  ],
} as const satisfies Book
