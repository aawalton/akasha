import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const theWarOfTheJewels = {
  id: "01a06808-148f-7035-a84d-c92a89c89a4a",
  type: "page-type/book-collection",
  slug: "the-war-of-the-jewels",
  title: "The War of the Jewels",
  partOfCollections: ["book-collection/the-history-of-middle-earth"],
  position: 11,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  publishedAt: "1994-01-01",
} as const satisfies BookCollection
