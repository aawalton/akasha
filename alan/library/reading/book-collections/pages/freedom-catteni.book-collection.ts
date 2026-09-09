import type { BookCollection } from "../book-collection.page-type.ts"

export const freedomCatteni = {
  id: "01a06808-148e-7023-8d44-713d7b834054",
  pageTypeSlug: "book-collection",
  type: "book-collection",
  slug: "freedom-catteni",
  title: "Freedom (Catteni)",
  partOfCollections: ["anne-mccaffrey"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies BookCollection
