import type { BookCollection } from "../book-collection.page-type.types.ts"

export const tommyAndTuppence = {
  id: "01a06808-148f-7038-a12f-534ac003f228",
  pageTypeSlug: "book-collection",
  type: "book-collection",
  slug: "tommy-and-tuppence",
  title: "Tommy and Tuppence",
  partOfCollections: ["agatha-christie"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies BookCollection
