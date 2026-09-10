import type { Book } from "../book.page-type.types.ts"

export const theGreatBooksOfTheWesternWorld19DanteChaucer = {
  id: "019db533-f39d-7808-91ed-0dfa5b82e815",
  pageTypeSlug: "book",
  type: "book",
  slug: "the-great-books-of-the-western-world-19-dante-chaucer",
  title: "The Great Books of the Western World 19: Dante, Chaucer",
  status: "not-started",
  unit: "words",
  position: 19,
  ownLength: 117750,
} as const satisfies Book
