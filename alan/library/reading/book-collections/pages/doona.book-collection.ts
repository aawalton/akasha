import type { BookCollection } from "../book-collection.page-type.ts"

export const doona = {
  id: "01a06808-148e-701d-a89c-15cf31c72e9d",
  pageTypeSlug: "book-collection",
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
