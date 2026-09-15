import type { AuthorCollection } from "akasha/alan/library/reading/author-collection/author-collection.page-type.types.ts"

export const fantasyAuthors = {
  id: "01a06808-06b4-7005-9128-48d4bcb13190",
  type: "author-collection",
  slug: "fantasy-authors",
  title: "Fantasy Authors",
  partOfCollections: ["author-collection/authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-applicable",
} as const satisfies AuthorCollection
