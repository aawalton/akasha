import type { BookCollection } from "../book-collection.page-type.ts"

export const brandonSanderson = {
  id: "01a06808-148e-700a-805d-63e9b1a15d86",
  pageTypeSlug: "book-collection",
  slug: "brandon-sanderson",
  title: "Brandon Sanderson",
  partOfSlugs: ["fantasy-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "paused",
} as const satisfies BookCollection
