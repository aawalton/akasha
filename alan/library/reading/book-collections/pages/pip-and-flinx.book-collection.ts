import type { BookCollection } from "../book-collection.page-type.ts"

export const pipAndFlinx = {
  id: "01a06808-148f-7009-8949-aae58e14acc0",
  pageTypeSlug: "book-collection",
  type: "book-collection",
  slug: "pip-and-flinx",
  title: "Pip & Flinx",
  partOfCollections: ["humanx-commonwealth"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies BookCollection
