import type { AuthorCollection } from "akasha/alan/library/reading/author-collection/author-collection.page-type.types.ts"

export const westernsAuthors = {
  id: "01a06808-06b5-7002-9e2a-62d6338c9bcd",
  type: "author-collection",
  slug: "westerns-authors",
  title: "Westerns Authors",
  partOfCollections: ["author-collection/authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-applicable",
} as const satisfies AuthorCollection
