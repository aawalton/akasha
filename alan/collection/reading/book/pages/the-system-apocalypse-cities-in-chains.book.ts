import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theSystemApocalypseCitiesInChains = {
  id: "019db533-f391-7bcf-b9f0-3474c9173865",
  type: "page-type/book",
  slug: "the-system-apocalypse-cities-in-chains",
  title: "The System Apocalypse: Cities in Chains",
  status: "completed",
  unit: "unit/words",
  position: 4,
  ownLength: 86500,
  ownProgress: 86500,
  publishedAt: "2018-06-01",
  partOfCollections: ["book-series/the-system-apocalypse"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07DGJM4D6",
      externalLink: "https://amazon.com/dp/B07DGJM4D6",
    },
  ],
} as const satisfies Book
