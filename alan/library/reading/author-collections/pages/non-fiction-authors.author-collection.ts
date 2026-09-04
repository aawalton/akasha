import type { AuthorCollection } from "../author-collection.page-type.ts"

export const nonFictionAuthors = {
  id: "01a06808-06b4-7007-b114-657e06171680",
  pageTypeSlug: "author-collection",
  slug: "non-fiction-authors",
  title: "Non-Fiction Authors",
  partOfSlugs: ["authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-applicable",
} as const satisfies AuthorCollection
