import type { AuthorCollection } from "akasha/alan/collection/reading/author-collection/author-collection.page-type.types.ts"

export const thrillerAuthors = {
  id: "01a06808-06b5-7001-a60a-5d9946fa3ca9",
  type: "page-type/author-collection",
  slug: "thriller-authors",
  title: "Thriller Authors",
  partOfCollections: ["author-collection/authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-applicable",
} as const satisfies AuthorCollection
