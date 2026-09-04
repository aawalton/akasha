import type { AuthorCollection } from "../author-collection.page-type.ts"

export const prophets = {
  id: "01a06808-06b4-7008-9b38-b83cb9147f22",
  pageTypeSlug: "author-collection",
  slug: "prophets",
  title: "Prophets",
  partOfSlugs: ["faith-authors"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies AuthorCollection
