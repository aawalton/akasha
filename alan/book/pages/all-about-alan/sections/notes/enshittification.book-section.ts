import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const enshittification = {
  id: "01a06594-c679-7002-87e4-f0f7fa3ea27a",
  type: "page-type/book-section",
  slug: "enshittification",
  title: "Enshittification",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
