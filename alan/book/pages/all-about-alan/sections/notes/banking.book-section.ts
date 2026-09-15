import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const banking = {
  id: "01a06594-c675-7010-8b3d-8b6c651c11da",
  type: "book-section",
  slug: "banking",
  title: "Banking",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
