import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const measurementMaturity = {
  id: "01a06594-c67b-7004-a6ee-e884c28ae200",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "measurement-maturity",
  title: "Measurement maturity",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
