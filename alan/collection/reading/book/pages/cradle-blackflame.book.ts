import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const cradleBlackflame = {
  id: "019db533-f390-7c2d-86de-57c396eae142",
  type: "page-type/book",
  slug: "cradle-blackflame",
  title: "Cradle: Blackflame",
  status: "completed",
  author: "Will Wight",
  unit: "unit/words",
  position: 3,
  ownLength: 92250,
  ownProgress: 92250,
  publishedAt: "2017-04-30",
  partOfCollections: ["book-series/cradle"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0716GZ8QX",
      externalLink: "https://amazon.com/dp/B0716GZ8QX",
    },
  ],
} as const satisfies Book
