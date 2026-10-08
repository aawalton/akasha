import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const motherOfLearningBook1 = {
  id: "019db533-f391-7351-af00-60b52a447ce4",
  type: "page-type/book",
  slug: "mother-of-learning-book-1",
  title: "Mother of Learning",
  status: "completed",
  author: "Domagoj Kurmaic",
  unit: "unit/words",
  position: 1,
  ownLength: 161250,
  ownProgress: 161250,
  publishedAt: "2021-12-01",
  partOfCollections: ["book-series/mother-of-learning"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B09M2R6QLF",
      externalLink: "https://amazon.com/dp/B09M2R6QLF",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
