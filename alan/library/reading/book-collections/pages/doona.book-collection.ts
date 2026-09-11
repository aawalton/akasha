import type { BookCollection } from "akasha/alan/library/reading/book-collections/book-collection.page-type.types.ts"

export const doona = {
  id: "01a06808-148e-701d-a89c-15cf31c72e9d",
  type: "book-collection",
  slug: "doona",
  title: "Doona",
  partOfCollections: ["anne-mccaffrey"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies BookCollection
