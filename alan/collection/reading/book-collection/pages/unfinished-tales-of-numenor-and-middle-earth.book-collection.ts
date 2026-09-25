import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const unfinishedTalesOfNumenorAndMiddleEarth = {
  id: "01a06808-148f-703b-8341-acb5a7274256",
  type: "page-type/book-collection",
  slug: "unfinished-tales-of-numenor-and-middle-earth",
  title: "Unfinished Tales of Númenor and Middle-earth",
  partOfCollections: ["book-collection/the-lord-of-the-rings-books"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  publishedAt: "1980-01-01",
} as const satisfies BookCollection
