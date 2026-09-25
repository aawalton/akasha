import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const roadToMastery4 = {
  id: "019db533-f391-7524-86ad-8d4a81f55047",
  type: "page-type/book",
  slug: "road-to-mastery-4",
  title: "Road to Mastery 4",
  status: "completed",
  author: "Valerios",
  unit: "unit/words",
  position: 4,
  ownLength: 178000,
  ownProgress: 178000,
  publishedAt: "2024-06-12",
  partOfCollections: ["book-series/road-to-mastery"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CT9QGBVV",
      externalLink: "https://amazon.com/dp/B0CT9QGBVV",
    },
  ],
} as const satisfies Book
