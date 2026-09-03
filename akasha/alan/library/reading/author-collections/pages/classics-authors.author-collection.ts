import type { AuthorCollection } from "../author-collection.page-type.ts"

export const classicsAuthors = {
  id: "01a06808-06b4-7003-abac-a8b7670a911e",
  pageTypeSlug: "author-collection",
  slug: "classics-authors",
  title: "Classics Authors",
  partOfSlugs: ["authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-applicable",
} as const satisfies AuthorCollection
