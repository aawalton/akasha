import type { BookCollection } from "../book-collection.page-type.ts"

export const bruceRMcconkie = {
  id: "01a06808-148e-700e-9ed9-e6f80856bceb",
  pageTypeSlug: "book-collection",
  slug: "bruce-r-mcconkie",
  title: "Bruce R. McConkie",
  partOfSlugs: ["apostles"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "paused",
} as const satisfies BookCollection
