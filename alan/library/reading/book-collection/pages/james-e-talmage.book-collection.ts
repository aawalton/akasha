import type { BookCollection } from "akasha/alan/library/reading/book-collection/book-collection.page-type.types.ts"

export const jamesETalmage = {
  id: "01a06808-148f-7000-99b0-789b675a67cf",
  type: "book-collection",
  slug: "james-e-talmage",
  title: "James E. Talmage",
  partOfCollections: ["author-collection/apostles"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies BookCollection
