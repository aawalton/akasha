import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const hellDifficultyTutorial2 = {
  id: "019db533-f391-7100-8a97-266042cb9ea5",
  type: "page-type/book",
  slug: "hell-difficulty-tutorial-2",
  title: "Hell Difficulty Tutorial 2",
  status: "not-started",
  unit: "unit/words",
  position: 2,
  ownLength: 182500,
  publishedAt: "2024-08-27",
  partOfCollections: ["book-series/hell-difficulty-tutorial"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0D365Q3HW",
      externalLink: "https://amazon.com/dp/B0D365Q3HW",
    },
  ],
} as const satisfies Book
