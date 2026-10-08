import type { AuthorCollection } from "akasha/alan/collection/reading/author-collection/author-collection.page-type.types.ts"

export const faithAuthors = {
  id: "01a06808-06b4-7004-b933-54bb2f173708",
  type: "page-type/author-collection",
  slug: "faith-authors",
  title: "Faith Authors",
  partOfCollections: ["author-collection/authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-applicable",
  createdAt: "2026-09-03T16:09:11.604Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies AuthorCollection
