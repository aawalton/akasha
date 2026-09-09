import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const enshittification = {
  id: "01a06594-c679-7002-87e4-f0f7fa3ea27a",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "enshittification",
  title: "Enshittification",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
