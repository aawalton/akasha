import type { AuthorCollection } from "akasha/alan/library/reading/author-collections/author-collection.page-type.types.ts"

export const authors = {
  id: "01a06808-06b4-7001-ac32-f964614131ad",
  type: "author-collection",
  slug: "authors",
  title: "Authors",
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-applicable",
} as const satisfies AuthorCollection
