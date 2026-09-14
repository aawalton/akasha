import type { AuthorCollection } from "akasha/alan/library/reading/author-collections/author-collection.page-type.types.ts"

export const faithAuthors = {
  id: "01a06808-06b4-7004-b933-54bb2f173708",
  type: "author-collection",
  slug: "faith-authors",
  title: "Faith Authors",
  partOfCollections: ["author-collection/authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-applicable",
} as const satisfies AuthorCollection
