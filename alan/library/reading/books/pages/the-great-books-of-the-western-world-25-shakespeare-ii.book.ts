import type { Book } from "../book.page-type.types.ts"

export const theGreatBooksOfTheWesternWorld25ShakespeareIi = {
  id: "019db533-f39d-78b6-968b-a93d26b0e63d",
  pageTypeSlug: "book",
  type: "book",
  slug: "the-great-books-of-the-western-world-25-shakespeare-ii",
  title: "The Great Books of the Western World 25: Shakespeare II",
  status: "not-started",
  author: "William Shakespeare",
  unit: "words",
  position: 25,
  ownLength: 152250,
} as const satisfies Book
