import type { BookCollection } from "../book-collection.page-type.types.ts"

export const acornaSChildren = {
  id: "01a06808-148e-7000-a321-5ca258870351",
  pageTypeSlug: "book-collection",
  type: "book-collection",
  slug: "acorna-s-children",
  title: "Acorna's Children",
  partOfCollections: ["anne-mccaffrey"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies BookCollection
