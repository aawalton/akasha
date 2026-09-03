import type { BookCollection } from "../book-collection.page-type.ts"

export const collectedDiscourses = {
  id: "01a06808-148e-7011-a126-18d7852d7803",
  pageTypeSlug: "book-collection",
  slug: "collected-discourses",
  title: "Collected Discourses",
  partOfSlugs: ["discourses"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies BookCollection
