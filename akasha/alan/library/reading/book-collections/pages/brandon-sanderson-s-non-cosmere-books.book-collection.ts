import type { BookCollection } from "../book-collection.page-type.ts"

export const brandonSandersonSNonCosmereBooks = {
  id: "01a06808-148e-700c-a652-862eed8e408f",
  pageTypeSlug: "book-collection",
  slug: "brandon-sanderson-s-non-cosmere-books",
  title: "Brandon Sanderson’s Non-Cosmere Books",
  partOfSlugs: ["brandon-sanderson"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "paused",
} as const satisfies BookCollection
