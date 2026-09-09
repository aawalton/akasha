import type { BookCollection } from "../book-collection.page-type.ts"

export const commentaries = {
  id: "01a06808-148e-7012-84c7-f309c387c0b2",
  pageTypeSlug: "book-collection",
  type: "book-collection",
  slug: "commentaries",
  title: "Commentaries",
  partOfCollections: ["history-collections"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "paused",
} as const satisfies BookCollection
