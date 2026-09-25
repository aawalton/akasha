import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const theReturnOfTheShadow = {
  id: "01a06808-148f-702e-9c43-36ffec852b9f",
  type: "page-type/book-collection",
  slug: "the-return-of-the-shadow",
  title: "The Return of the Shadow",
  partOfCollections: ["book-collection/the-history-of-middle-earth"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  publishedAt: "1988-01-01",
} as const satisfies BookCollection
