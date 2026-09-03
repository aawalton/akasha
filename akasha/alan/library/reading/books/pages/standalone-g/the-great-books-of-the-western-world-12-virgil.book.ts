import type { Book } from "../../book.page-type.ts"

export const theGreatBooksOfTheWesternWorld12Virgil = {
  id: "019db533-f39d-792b-b0b9-bedc07563da5",
  pageTypeSlug: "book",
  slug: "the-great-books-of-the-western-world-12-virgil",
  title: "The Great Books of the Western World 12: Virgil",
  kind: "read",
  status: "not-started",
  author: "Όμηρος",
  unitSlug: "words",
  position: 12,
  ownLength: 80250,
} as const satisfies Book
