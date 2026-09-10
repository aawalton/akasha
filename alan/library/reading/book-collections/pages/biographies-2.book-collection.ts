import type { BookCollection } from "../book-collection.page-type.types.ts"

export const biographies2 = {
  id: "01a06808-148e-7007-8091-1c04fc279fea",
  pageTypeSlug: "book-collection",
  type: "book-collection",
  slug: "biographies-2",
  title: "Biographies",
  partOfCollections: ["history-collections"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "completed",
} as const satisfies BookCollection
