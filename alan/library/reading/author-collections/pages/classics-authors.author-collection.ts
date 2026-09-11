import type { AuthorCollection } from "akasha/alan/library/reading/author-collections/author-collection.page-type.types.ts"

export const classicsAuthors = {
  id: "01a06808-06b4-7003-abac-a8b7670a911e",
  type: "author-collection",
  slug: "classics-authors",
  title: "Classics Authors",
  partOfCollections: ["authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-applicable",
} as const satisfies AuthorCollection
