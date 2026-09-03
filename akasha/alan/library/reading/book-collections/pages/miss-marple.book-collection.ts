import type { BookCollection } from "../book-collection.page-type.ts"

export const missMarple = {
  id: "01a06808-148f-7004-8028-26c494edea6a",
  pageTypeSlug: "book-collection",
  slug: "miss-marple",
  title: "Miss Marple",
  partOfSlugs: ["agatha-christie"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies BookCollection
