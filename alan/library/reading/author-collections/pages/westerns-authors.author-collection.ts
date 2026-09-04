import type { AuthorCollection } from "../author-collection.page-type.ts"

export const westernsAuthors = {
  id: "01a06808-06b5-7002-9e2a-62d6338c9bcd",
  pageTypeSlug: "author-collection",
  slug: "westerns-authors",
  title: "Westerns Authors",
  partOfSlugs: ["authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-applicable",
} as const satisfies AuthorCollection
