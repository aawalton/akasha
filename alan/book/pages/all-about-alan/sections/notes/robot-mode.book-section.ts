import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const robotMode = {
  id: "01a06594-c67c-7013-91ef-f585953da6b0",
  type: "page-type/book-section",
  slug: "robot-mode",
  title: "Robot mode",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
