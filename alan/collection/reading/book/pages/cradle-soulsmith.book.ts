import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const cradleSoulsmith = {
  id: "019db533-f390-7c57-9fd3-517a41011440",
  type: "page-type/book",
  slug: "cradle-soulsmith",
  title: "Cradle: Soulsmith",
  status: "completed",
  author: "Will Wight",
  unit: "unit/words",
  position: 2,
  ownLength: 70500,
  ownProgress: 70500,
  publishedAt: "2016-09-26",
  partOfCollections: ["book-series/cradle"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B01M09PWJQ",
      externalLink: "https://amazon.com/dp/B01M09PWJQ",
    },
  ],
} as const satisfies Book
