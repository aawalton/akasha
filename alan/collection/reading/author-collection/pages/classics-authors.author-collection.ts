import type { AuthorCollection } from "akasha/alan/collection/reading/author-collection/author-collection.page-type.types.ts"

export const classicsAuthors = {
  id: "01a06808-06b4-7003-abac-a8b7670a911e",
  type: "page-type/author-collection",
  slug: "classics-authors",
  title: "Classics Authors",
  partOfCollections: ["author-collection/authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-applicable",
} as const satisfies AuthorCollection
