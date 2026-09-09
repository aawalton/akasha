import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const robotMode = {
  id: "01a06594-c67c-7013-91ef-f585953da6b0",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "robot-mode",
  title: "Robot mode",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
