import type { Book } from "../book.page-type.types.ts"

export const theGreatBooksOfTheWesternWorld23ErasmusMontaigne = {
  id: "019db533-f39d-78de-836a-4b3e12961b25",
  pageTypeSlug: "book",
  type: "book",
  slug: "the-great-books-of-the-western-world-23-erasmus-montaigne",
  title: "The Great Books of the Western World 23: Erasmus, Montaigne",
  status: "not-started",
  unit: "words",
  position: 23,
  ownLength: 149250,
} as const satisfies Book
