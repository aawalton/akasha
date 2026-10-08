import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const hellDifficultyTutorial3 = {
  id: "019db533-f391-70db-ae42-1f57e3773503",
  type: "page-type/book",
  slug: "hell-difficulty-tutorial-3",
  title: "Hell Difficulty Tutorial 3",
  status: "not-started",
  unit: "unit/words",
  position: 3,
  ownLength: 198500,
  publishedAt: "2024-12-04",
  partOfCollections: ["book-series/hell-difficulty-tutorial"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DD4BQ9PC",
      externalLink: "https://amazon.com/dp/B0DD4BQ9PC",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
