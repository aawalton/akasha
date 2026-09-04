import type { BookCollection } from "../book-collection.page-type.ts"

export const talent = {
  id: "01a06808-148f-7014-be21-6a7b03ee73ff",
  pageTypeSlug: "book-collection",
  slug: "talent",
  title: "Talent",
  partOfSlugs: ["anne-mccaffrey"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies BookCollection
