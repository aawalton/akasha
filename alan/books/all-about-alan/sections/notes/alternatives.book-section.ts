import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.ts"

export const alternatives = {
  id: "01a06594-c674-700d-9d60-85204b73ee42",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "alternatives",
  title: "Alternatives",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
