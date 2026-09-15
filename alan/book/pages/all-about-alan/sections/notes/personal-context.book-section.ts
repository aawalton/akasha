import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const personalContext = {
  id: "01a06594-c67c-7002-9a09-7ea028c3396e",
  type: "book-section",
  slug: "personal-context",
  title: "Personal context",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
