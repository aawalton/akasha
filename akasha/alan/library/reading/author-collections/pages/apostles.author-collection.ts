import type { AuthorCollection } from "../author-collection.page-type.ts"

export const apostles = {
  id: "01a06808-06b4-7000-bf64-7a91fb325918",
  pageTypeSlug: "author-collection",
  slug: "apostles",
  title: "Apostles",
  partOfSlugs: ["faith-authors"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies AuthorCollection
