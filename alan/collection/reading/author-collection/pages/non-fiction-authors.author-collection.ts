import type { AuthorCollection } from "akasha/alan/collection/reading/author-collection/author-collection.page-type.types.ts"

export const nonFictionAuthors = {
  id: "01a06808-06b4-7007-b114-657e06171680",
  type: "page-type/author-collection",
  slug: "non-fiction-authors",
  title: "Non-Fiction Authors",
  partOfCollections: ["author-collection/authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-applicable",
} as const satisfies AuthorCollection
