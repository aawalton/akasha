import type { Book } from "akasha/alan/library/reading/books/book.page-type.types.ts"

export const disgardiumGloryToTheDominion = {
  id: "019db533-f390-7d67-8d40-050e31c702cc",
  type: "book",
  slug: "disgardium-glory-to-the-dominion",
  title: "Disgardium: Glory to the Dominion!",
  status: "not-started",
  unit: "words",
  position: 9,
  ownLength: 126750,
  publishedAt: "2021-11-04",
  partOfCollections: ["book-series/disgardium"],
  source: "kindle",
  externalId: "B09C2KR6V6",
  externalLink: "https://amazon.com/dp/B09C2KR6V6",
} as const satisfies Book
