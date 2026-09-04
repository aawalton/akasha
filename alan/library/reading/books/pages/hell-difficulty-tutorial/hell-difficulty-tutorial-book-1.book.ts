import type { Book } from "../../book.page-type.ts"

export const hellDifficultyTutorialBook1 = {
  id: "019db533-f391-70f7-88a4-a3a4d2fc5b65",
  pageTypeSlug: "book",
  slug: "hell-difficulty-tutorial-book-1",
  title: "Hell Difficulty Tutorial",
  kind: "read",
  status: "not-started",
  author: "Cerim, Karassawa, Der-Shing Helmer",
  unitSlug: "words",
  position: 1,
  ownLength: 154500,
  publishedAt: "2024-05-14",
  partOfSlugs: ["book-series/hell-difficulty-tutorial"],
  source: "kindle",
  externalId: "B0CRSQ1YKP",
  externalLink: "https://amazon.com/dp/B0CRSQ1YKP",
} as const satisfies Book
