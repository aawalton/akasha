import type { BookCollection } from "../book-collection.page-type.ts"

export const documents = {
  id: "01a06808-148e-701c-ab41-27b264171e4e",
  pageTypeSlug: "book-collection",
  slug: "documents",
  title: "Documents",
  partOfSlugs: ["the-joseph-smith-papers"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies BookCollection
