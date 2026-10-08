import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theWayOfTheShamanTheSecretOfTheDarkForest = {
  id: "019db533-f38b-75b0-869b-f107a9b8bd27",
  type: "page-type/book",
  slug: "the-way-of-the-shaman-the-secret-of-the-dark-forest",
  title: "The Way of the Shaman: The Secret of the Dark Forest",
  status: "completed",
  author: "Vasily Mahanenko",
  unit: "unit/words",
  position: 3,
  ownLength: 149000,
  ownProgress: 149000,
  publishedAt: "2016-07-04",
  partOfCollections: ["book-series/the-way-of-the-shaman"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B01HZ4TYDM",
      externalLink: "https://amazon.com/dp/B01HZ4TYDM",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
