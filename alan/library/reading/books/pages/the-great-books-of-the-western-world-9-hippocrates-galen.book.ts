import type { Book } from "../book.page-type.types.ts"

export const theGreatBooksOfTheWesternWorld9HippocratesGalen = {
  id: "019db533-f39d-77a0-b124-3c0e9a0dec3d",
  pageTypeSlug: "book",
  type: "book",
  slug: "the-great-books-of-the-western-world-9-hippocrates-galen",
  title: "The Great Books of the Western World 9: Hippocrates, Galen",
  status: "completed",
  rank: "C",
  unit: "words",
  position: 9,
  ownLength: 112250,
  ownProgress: 112250,
} as const satisfies Book
