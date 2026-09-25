import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const theGreatBooksOfTheWesternWorld = {
  id: "01a06808-148f-7024-9864-399d329a44be",
  type: "page-type/book-collection",
  slug: "the-great-books-of-the-western-world",
  title: "The Great Books of the Western World",
  partOfCollections: ["book-collection/classics-collections"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "paused",
} as const satisfies BookCollection
