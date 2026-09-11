import type { BookCollection } from "akasha/alan/library/reading/book-collections/book-collection.page-type.types.ts"

export const annalsOfAmerica = {
  id: "01a06808-148e-7003-9480-92d4b7b0ba76",
  type: "book-collection",
  slug: "annals-of-america",
  title: "Annals of America",
  partOfCollections: ["history-collections"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "paused",
} as const satisfies BookCollection
