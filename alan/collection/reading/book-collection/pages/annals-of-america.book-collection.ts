import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const annalsOfAmerica = {
  id: "01a06808-148e-7003-9480-92d4b7b0ba76",
  type: "page-type/book-collection",
  slug: "annals-of-america",
  title: "Annals of America",
  partOfCollections: ["book-collection/history-collections"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "paused",
} as const satisfies BookCollection
