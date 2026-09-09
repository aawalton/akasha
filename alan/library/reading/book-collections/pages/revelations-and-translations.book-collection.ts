import type { BookCollection } from "../book-collection.page-type.ts"

export const revelationsAndTranslations = {
  id: "01a06808-148f-700c-be1a-eaffeb989c12",
  pageTypeSlug: "book-collection",
  slug: "revelations-and-translations",
  title: "Revelations and Translations",
  partOfCollections: ["the-joseph-smith-papers"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies BookCollection
