import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const hellDifficultyTutorial4 = {
  id: "019db533-f391-70e7-8660-97ebbf5624dc",
  type: "page-type/book",
  slug: "hell-difficulty-tutorial-4",
  title: "Hell Difficulty Tutorial 4",
  status: "not-started",
  unit: "unit/words",
  position: 4,
  ownLength: 180500,
  publishedAt: "2025-03-12",
  partOfCollections: ["book-series/hell-difficulty-tutorial"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DNNHGZ1H",
      externalLink: "https://amazon.com/dp/B0DNNHGZ1H",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
