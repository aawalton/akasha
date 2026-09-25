import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const revelationsAndTranslations = {
  id: "01a06808-148f-700c-be1a-eaffeb989c12",
  type: "page-type/book-collection",
  slug: "revelations-and-translations",
  title: "Revelations and Translations",
  partOfCollections: ["book-collection/the-joseph-smith-papers"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies BookCollection
