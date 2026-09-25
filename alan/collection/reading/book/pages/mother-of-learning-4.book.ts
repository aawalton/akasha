import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const motherOfLearning4 = {
  id: "019db533-f391-732e-ab9e-e87058b183ac",
  type: "page-type/book",
  slug: "mother-of-learning-4",
  title: "Mother of Learning 4",
  status: "completed",
  author: "James McBride",
  unit: "unit/words",
  position: 4,
  ownLength: 150250,
  ownProgress: 150250,
  publishedAt: "2023-04-04",
  partOfCollections: ["book-series/mother-of-learning"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BWSCYLRQ",
      externalLink: "https://amazon.com/dp/B0BWSCYLRQ",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
