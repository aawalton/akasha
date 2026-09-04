import type { BookCollection } from "../book-collection.page-type.ts"

export const discourses = {
  id: "01a06808-148e-7018-8575-3ec3ff497e4e",
  pageTypeSlug: "book-collection",
  slug: "discourses",
  title: "Discourses",
  partOfSlugs: ["faith-collections"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies BookCollection
