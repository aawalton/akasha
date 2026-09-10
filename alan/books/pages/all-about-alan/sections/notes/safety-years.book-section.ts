import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const safetyYears = {
  id: "01a06594-c682-7001-85a0-d75c796d8c3b",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "safety-years",
  title: "Safety Years",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
