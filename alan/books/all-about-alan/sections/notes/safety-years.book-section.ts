import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const safetyYears = {
  id: "01a06594-c682-7001-85a0-d75c796d8c3b",
  pageTypeSlug: "book-section",
  slug: "safety-years",
  title: "Safety Years",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
