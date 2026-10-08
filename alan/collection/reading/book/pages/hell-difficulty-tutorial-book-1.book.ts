import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const hellDifficultyTutorialBook1 = {
  id: "019db533-f391-70f7-88a4-a3a4d2fc5b65",
  type: "page-type/book",
  slug: "hell-difficulty-tutorial-book-1",
  title: "Hell Difficulty Tutorial",
  status: "not-started",
  author: "Cerim, Karassawa, Der-Shing Helmer",
  unit: "unit/words",
  position: 1,
  ownLength: 154500,
  publishedAt: "2024-05-14",
  partOfCollections: ["book-series/hell-difficulty-tutorial"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CRSQ1YKP",
      externalLink: "https://amazon.com/dp/B0CRSQ1YKP",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
