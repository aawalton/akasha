import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const cradleUnsouled = {
  id: "019db533-f390-7c3b-a541-304ae837d20a",
  type: "page-type/book",
  slug: "cradle-unsouled",
  title: "Cradle: Unsouled",
  status: "completed",
  author: "Will Wight",
  unit: "unit/words",
  position: 1,
  ownLength: 72750,
  ownProgress: 72750,
  publishedAt: "2016-06-13",
  partOfCollections: ["book-series/cradle"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B01H1CYBS6",
      externalLink: "https://amazon.com/dp/B01H1CYBS6",
    },
  ],
} as const satisfies Book
