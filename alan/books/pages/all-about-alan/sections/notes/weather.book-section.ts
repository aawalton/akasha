import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const weather = {
  id: "01a06594-c686-7004-b7b2-720b2cf3bea1",
  type: "book-section",
  slug: "weather",
  title: "Weather",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
