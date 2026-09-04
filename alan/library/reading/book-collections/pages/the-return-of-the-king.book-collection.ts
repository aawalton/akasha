import type { BookCollection } from "../book-collection.page-type.ts"

export const theReturnOfTheKing = {
  id: "01a06808-148f-702d-b46e-1f8d94e67a85",
  pageTypeSlug: "book-collection",
  slug: "the-return-of-the-king",
  title: "The Return of the King",
  partOfSlugs: ["the-lord-of-the-rings"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "completed",
  rank: "A",
  publishedAt: "1955-10-20",
} as const satisfies BookCollection
