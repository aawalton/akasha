import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const roadToMastery6 = {
  id: "019db533-f391-752f-9c24-9683d4d1810e",
  type: "page-type/book",
  slug: "road-to-mastery-6",
  title: "Road to Mastery 6",
  status: "completed",
  author: "Valerios",
  unit: "unit/words",
  position: 6,
  ownLength: 189000,
  ownProgress: 189000,
  publishedAt: "2025-02-19",
  partOfCollections: ["book-series/road-to-mastery"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DJG41RJP",
      externalLink: "https://amazon.com/dp/B0DJG41RJP",
    },
  ],
} as const satisfies Book
