import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const cradleUncrowned = {
  id: "019db533-f390-7c0f-bfc8-43ee91e0074d",
  type: "page-type/book",
  slug: "cradle-uncrowned",
  title: "Cradle: Uncrowned",
  status: "completed",
  author: "Will Wight",
  unit: "unit/words",
  position: 7,
  ownLength: 94000,
  ownProgress: 94000,
  publishedAt: "2019-09-26",
  partOfCollections: ["book-series/cradle"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07X8ZH6BS",
      externalLink: "https://amazon.com/dp/B07X8ZH6BS",
    },
  ],
} as const satisfies Book
