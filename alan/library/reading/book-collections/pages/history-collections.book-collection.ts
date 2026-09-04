import type { BookCollection } from "../book-collection.page-type.ts"

export const historyCollections = {
  id: "01a06808-148e-702a-9e72-e4221d101cde",
  pageTypeSlug: "book-collection",
  slug: "history-collections",
  title: "History Collections",
  partOfSlugs: ["book-collections"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-applicable",
} as const satisfies BookCollection
