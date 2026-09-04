import type { BookCollection } from "../book-collection.page-type.ts"

export const brandonSandersonSCosmereBooks = {
  id: "01a06808-148e-700b-bf2a-18fe855b306e",
  pageTypeSlug: "book-collection",
  slug: "brandon-sanderson-s-cosmere-books",
  title: "Brandon Sanderson’s Cosmere Books",
  partOfSlugs: ["brandon-sanderson"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "paused",
} as const satisfies BookCollection
