import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const discoursesOfPresidentGordonBHinckley = {
  id: "01a06808-148e-7019-8b7a-c04424d4acc3",
  type: "page-type/book-collection",
  slug: "discourses-of-president-gordon-b-hinckley",
  title: "Discourses of President Gordon B. Hinckley",
  partOfCollections: ["author/gordon-b-hinckley"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies BookCollection
