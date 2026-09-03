import type { BookCollection } from "../book-collection.page-type.ts"

export const histories = {
  id: "01a06808-148e-7027-90c5-c816c6339522",
  pageTypeSlug: "book-collection",
  slug: "histories",
  title: "Histories",
  partOfSlugs: ["the-joseph-smith-papers"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies BookCollection
