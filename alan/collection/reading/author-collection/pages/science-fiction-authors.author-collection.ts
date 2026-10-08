import type { AuthorCollection } from "akasha/alan/collection/reading/author-collection/author-collection.page-type.types.ts"

export const scienceFictionAuthors = {
  id: "01a06808-06b5-7000-8918-9259b5ed3ff2",
  type: "page-type/author-collection",
  slug: "science-fiction-authors",
  title: "Science Fiction Authors",
  partOfCollections: ["author-collection/authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-applicable",
  createdAt: "2026-09-03T16:09:11.605Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies AuthorCollection
