import type { BookCollection } from "../book-collection.page-type.types.ts"

export const talent = {
  id: "01a06808-148f-7014-be21-6a7b03ee73ff",
  pageTypeSlug: "book-collection",
  type: "book-collection",
  slug: "talent",
  title: "Talent",
  partOfCollections: ["anne-mccaffrey"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies BookCollection
