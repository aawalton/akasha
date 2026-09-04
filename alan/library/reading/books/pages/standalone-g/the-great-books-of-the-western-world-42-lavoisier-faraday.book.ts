import type { Book } from "../../book.page-type.ts"

export const theGreatBooksOfTheWesternWorld42LavoisierFaraday = {
  id: "019db533-f39d-761b-ad77-c3567cc4f308",
  pageTypeSlug: "book",
  slug: "the-great-books-of-the-western-world-42-lavoisier-faraday",
  title: "The Great Books of the Western World 42: Lavoisier, Faraday",
  status: "not-started",
  unitSlug: "words",
  position: 42,
  ownLength: 201500,
} as const satisfies Book
