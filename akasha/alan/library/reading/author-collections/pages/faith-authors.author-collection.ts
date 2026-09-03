import type { AuthorCollection } from "../author-collection.page-type.ts"

export const faithAuthors = {
  id: "01a06808-06b4-7004-b933-54bb2f173708",
  pageTypeSlug: "author-collection",
  slug: "faith-authors",
  title: "Faith Authors",
  partOfSlugs: ["authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-applicable",
} as const satisfies AuthorCollection
