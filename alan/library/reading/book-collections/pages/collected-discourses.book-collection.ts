import type { BookCollection } from "akasha/alan/library/reading/book-collections/book-collection.page-type.types.ts"

export const collectedDiscourses = {
  id: "01a06808-148e-7011-a126-18d7852d7803",
  type: "book-collection",
  slug: "collected-discourses",
  title: "Collected Discourses",
  partOfCollections: ["discourses"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies BookCollection
