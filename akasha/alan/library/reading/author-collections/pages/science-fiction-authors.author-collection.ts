import type { AuthorCollection } from "../author-collection.page-type.ts"

export const scienceFictionAuthors = {
  id: "01a06808-06b5-7000-8918-9259b5ed3ff2",
  pageTypeSlug: "author-collection",
  slug: "science-fiction-authors",
  title: "Science Fiction Authors",
  partOfSlugs: ["authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-applicable",
} as const satisfies AuthorCollection
