import type { BookCollection } from "../book-collection.page-type.ts"

export const jamesETalmage = {
  id: "01a06808-148f-7000-99b0-789b675a67cf",
  pageTypeSlug: "book-collection",
  slug: "james-e-talmage",
  title: "James E. Talmage",
  partOfSlugs: ["apostles"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies BookCollection
