import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const faithCollections = {
  id: "01a06808-148e-701f-9f30-ad9852389594",
  type: "page-type/book-collection",
  slug: "faith-collections",
  title: "Faith Collections",
  partOfCollections: ["book-collection/book-collections"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies BookCollection
