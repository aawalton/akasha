import type { AuthorCollection } from "../author-collection.page-type.ts"

export const fantasyAuthors = {
  id: "01a06808-06b4-7005-9128-48d4bcb13190",
  pageTypeSlug: "author-collection",
  slug: "fantasy-authors",
  title: "Fantasy Authors",
  partOfSlugs: ["authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-applicable",
} as const satisfies AuthorCollection
