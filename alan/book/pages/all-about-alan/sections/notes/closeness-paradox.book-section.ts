import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const closenessParadox = {
  id: "01a06594-c676-700b-8ada-79196b7ec20b",
  type: "book-section",
  slug: "closeness-paradox",
  title: "The closeness paradox",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
