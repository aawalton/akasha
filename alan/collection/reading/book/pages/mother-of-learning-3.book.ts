import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const motherOfLearning3 = {
  id: "019db533-f391-733a-bb59-e115740911fd",
  type: "page-type/book",
  slug: "mother-of-learning-3",
  title: "Mother of Learning 3",
  status: "completed",
  author: "James McBride",
  unit: "unit/words",
  position: 3,
  ownLength: 185750,
  ownProgress: 185750,
  publishedAt: "2022-09-06",
  partOfCollections: ["book-series/mother-of-learning"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BCGMW45C",
      externalLink: "https://amazon.com/dp/B0BCGMW45C",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
