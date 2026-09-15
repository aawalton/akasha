import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const executiveFunction = {
  id: "01a06594-c679-7005-9cbb-a7698c53ebbb",
  type: "page-type/book-section",
  slug: "executive-function",
  title: "Executive function",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
