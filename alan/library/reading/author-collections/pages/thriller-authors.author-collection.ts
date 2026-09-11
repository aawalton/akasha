import type { AuthorCollection } from "akasha/alan/library/reading/author-collections/author-collection.page-type.types.ts"

export const thrillerAuthors = {
  id: "01a06808-06b5-7001-a60a-5d9946fa3ca9",
  type: "author-collection",
  slug: "thriller-authors",
  title: "Thriller Authors",
  partOfCollections: ["authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-applicable",
} as const satisfies AuthorCollection
