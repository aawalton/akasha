import type { AuthorCollection } from "../author-collection.page-type.ts"

export const churchScholars = {
  id: "01a06808-06b4-7002-b8fa-83e0fa8481f1",
  pageTypeSlug: "author-collection",
  type: "author-collection",
  slug: "church-scholars",
  title: "Church Scholars",
  partOfCollections: ["faith-collections"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies AuthorCollection
