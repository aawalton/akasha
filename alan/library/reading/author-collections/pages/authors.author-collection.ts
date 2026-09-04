import type { AuthorCollection } from "../author-collection.page-type.ts"

export const authors = {
  id: "01a06808-06b4-7001-ac32-f964614131ad",
  pageTypeSlug: "author-collection",
  slug: "authors",
  title: "Authors",
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-applicable",
} as const satisfies AuthorCollection
