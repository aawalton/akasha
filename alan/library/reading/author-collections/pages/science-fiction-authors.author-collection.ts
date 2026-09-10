import type { AuthorCollection } from "../author-collection.page-type.types.ts"

export const scienceFictionAuthors = {
  id: "01a06808-06b5-7000-8918-9259b5ed3ff2",
  pageTypeSlug: "author-collection",
  type: "author-collection",
  slug: "science-fiction-authors",
  title: "Science Fiction Authors",
  partOfCollections: ["authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-applicable",
} as const satisfies AuthorCollection
