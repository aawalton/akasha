import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const accommodationNotExcuse = {
  id: "01a06594-c674-7004-a42c-c1af0b58123b",
  type: "page-type/book-section",
  slug: "accommodation-not-excuse",
  title: "Accommodation, not excuse",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
