import type { BookCollection } from "akasha/alan/library/reading/book-collections/book-collection.page-type.types.ts"

export const theTreasonOfIsengard = {
  id: "01a06808-148f-7033-9838-a48808f0ddeb",
  type: "book-collection",
  slug: "the-treason-of-isengard",
  title: "The Treason of Isengard",
  partOfCollections: ["the-history-of-middle-earth"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
  publishedAt: "1989-01-01",
} as const satisfies BookCollection
