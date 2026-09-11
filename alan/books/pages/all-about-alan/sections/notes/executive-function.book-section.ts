import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const executiveFunction = {
  id: "01a06594-c679-7005-9cbb-a7698c53ebbb",
  type: "book-section",
  slug: "executive-function",
  title: "Executive function",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
