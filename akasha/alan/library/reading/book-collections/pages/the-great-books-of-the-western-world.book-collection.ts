import type { BookCollection } from "../book-collection.page-type.ts"

export const theGreatBooksOfTheWesternWorld = {
  id: "01a06808-148f-7024-9864-399d329a44be",
  pageTypeSlug: "book-collection",
  slug: "the-great-books-of-the-western-world",
  title: "The Great Books of the Western World",
  partOfSlugs: ["classics-collections"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "paused",
} as const satisfies BookCollection
