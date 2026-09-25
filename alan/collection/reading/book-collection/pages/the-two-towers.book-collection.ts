import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const theTwoTowers = {
  id: "01a06808-148f-7034-a837-b4255131191d",
  type: "page-type/book-collection",
  slug: "the-two-towers",
  title: "The Two Towers",
  partOfCollections: ["book-collection/the-lord-of-the-rings"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "completed",
  grade: "A",
  publishedAt: "1954-11-11",
} as const satisfies BookCollection
