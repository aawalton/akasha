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
} as const satisfies Book
