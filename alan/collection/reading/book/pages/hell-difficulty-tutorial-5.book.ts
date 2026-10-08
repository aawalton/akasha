import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const hellDifficultyTutorial5 = {
  id: "019db533-f391-709d-abd6-e7c56bb1db7b",
  type: "page-type/book",
  slug: "hell-difficulty-tutorial-5",
  title: "Hell Difficulty Tutorial 5",
  status: "not-started",
  unit: "unit/words",
  position: 5,
  ownLength: 169500,
  publishedAt: "2025-07-02",
  partOfCollections: ["book-series/hell-difficulty-tutorial"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DYPGVRSM",
      externalLink: "https://amazon.com/dp/B0DYPGVRSM",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
