import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const safetyYears = {
  id: "01a06594-c682-7001-85a0-d75c796d8c3b",
  type: "page-type/book-section",
  slug: "safety-years",
  title: "Safety Years",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
