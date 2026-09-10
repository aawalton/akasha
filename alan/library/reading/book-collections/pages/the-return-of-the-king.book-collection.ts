import type { BookCollection } from "../book-collection.page-type.types.ts"

export const theReturnOfTheKing = {
  id: "01a06808-148f-702d-b46e-1f8d94e67a85",
  pageTypeSlug: "book-collection",
  type: "book-collection",
  slug: "the-return-of-the-king",
  title: "The Return of the King",
  partOfCollections: ["the-lord-of-the-rings"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "completed",
  rank: "A",
  publishedAt: "1955-10-20",
} as const satisfies BookCollection
