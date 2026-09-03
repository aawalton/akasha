import type { BookCollection } from "../book-collection.page-type.ts"

export const tommyAndTuppence = {
  id: "01a06808-148f-7038-a12f-534ac003f228",
  pageTypeSlug: "book-collection",
  slug: "tommy-and-tuppence",
  title: "Tommy and Tuppence",
  partOfSlugs: ["agatha-christie"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies BookCollection
