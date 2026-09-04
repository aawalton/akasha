import type { Book } from "../../book.page-type.ts"

export const theGreatBooksOfTheWesternWorld27Cervantes = {
  id: "019db533-f39d-783e-88c5-c635f169449c",
  pageTypeSlug: "book",
  slug: "the-great-books-of-the-western-world-27-cervantes",
  title: "The Great Books of the Western World 27: Cervantes",
  status: "not-started",
  author: "Miguel de Cervantes Saavedra",
  unitSlug: "words",
  position: 27,
  ownLength: 127250,
} as const satisfies Book
